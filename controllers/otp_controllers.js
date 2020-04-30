const AWS = require("aws-sdk");
const { otp_table, aws } = require("../config/secrets");

const config = new AWS.Config({
  accessKeyId: aws.ACCESS_ID,
  secretAccessKey: aws.ACCESS_SECRET,
  region: aws.REGION
});

//special case because of region
const config_sns = new AWS.Config({
  accessKeyId: aws.ACCESS_ID,
  secretAccessKey: aws.ACCESS_SECRET,
  region: "us-east-1"
});

const db = new AWS.DynamoDB(config);
const sns = new AWS.SNS(config_sns);

module.exports.sendOtp = async (req, res) => {
  if (!req.body.phone) {
    return res.json({ success: false, message: "Necessary parameters missing", data: {} });
  }
  const params = {
    TableName: otp_table.TABLE_NAME,
    Key: {
      phone: { S: req.body.phone }
    }
  };

  try {
    const found = await db.getItem(params).promise();
    if (found.Item) {
      let d = {};
      //extracting into a better format
      Object.keys(found.Item).forEach(item => {
        d[item] = "";
        Object.keys(found.Item[item]).forEach(val => {
          d[item] = found.Item[item][val];
        });
      });
      found.Item = d;
      if (found.Item.expiry < Math.floor(Date.now() / 1000)) {
        await generateAndSendOTP(req.body.phone, 0);
        return res.json({ success: true, message: "OTP sent successfully", data: {} });
      } else if (found.Item.tries < 3) {
        await generateAndSendOTP(req.body.phone, found.Item.tries + 1);

        return res.json({ success: true, message: "OTP sent successfully", data: {} });
      } else {
        return res.json({
          success: false,
          message: "Maximum retry limit reached, please try after some time",
          data: {}
        });
      }
    } else {
      await generateAndSendOTP(req.body.phone, 0);
      return res.json({ success: true, message: "OTP sent successfully", data: {} });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Some error occured", data: {} });
  }
};

module.exports.verifyOtp = async (req, res, next) => {
  if (!req.body.phone || !req.body.otp) {
    return { success: false, message: "Necessary parameters missing", data: {} };
  }
  const params = {
    TableName: otp_table.TABLE_NAME,
    Key: {
      phone: { S: req.body.phone }
    }
  };
  try {
    const found = await db.getItem(params).promise();
    let d = {};
    //extracting into a better format
    Object.keys(found.Item).forEach(item => {
      d[item] = "";
      Object.keys(found.Item[item]).forEach(val => {
        d[item] = found.Item[item][val];
      });
    });
    found.Item = d;
    if (found.Item && found.Item.expiry > Date.now() / 1000) {
      if (found.Item.otp.trim() == req.body.otp.trim()) {
        await db.deleteItem(params).promise();
        return { success: true, message: "OTP provided is incorrect", data: {} };
      } else return { success: false, message: "OTP provided is incorrect", data: {} };
    } else {
      return { success: false, message: "OTP has expired", data: {} };
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: "Some error occured", data: {} };
  }
};

const generateAndSendOTP = async (phone, currentTries) => {
  let OTP = Math.floor(Math.random() * 899999) + 1000;
  OTP = OTP.toString();
  if (OTP.length != 6) {
    return generateAndSendOTP(phone, currentTries);
  }
  const otpParams = {
    TableName: otp_table.TABLE_NAME,
    Item: {
      phone: { S: `${phone}` },
      otp: { S: `${OTP}` },
      expiry: { N: `${Math.floor(Date.now() / 1000) + 300}` },
      tries: { N: `${currentTries}` }
    }
  };

  const text = `${OTP} is the one time password(OTP) for your login in the ZOUDIY App. Validity of OTP is 5 minutes. Please don't share it with anyone`;

  const snsParams = {
    Message: text,
    PhoneNumber: phone,
    MessageAttributes: {
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: "Transactional"
      },
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "Zoudiy"
      }
    }
  };
  await sns.publish(snsParams).promise();

  await db.putItem(otpParams).promise();
};
