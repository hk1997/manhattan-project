const client = require("../../../models/client/clientAuth");
const otp_system = require("../../otp_controllers");
const helpers = require("../../helpers");

//controllers for otp based login
module.exports.sendOtp = otp_system.sendOtp;
module.exports.verifyOtp = async (req, res, next) => {
    try {
        let verificationStatus = await otp_system.verifyOtp(req, res, next);
        if (verificationStatus["success"] == true) {
            // registering new client
            client.upsertPhoneUser(req.body.phone).then(data => {
                req.user = data["data"];
                return helpers.generateTokenMiddleware(req, res);
            });
        } else {
            return res.json(verificationStatus);
        }
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Some error occured", data: {} });
    }
};