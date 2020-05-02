const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const { aws, bucketDetails } = require("../config/secrets");

const config = new AWS.Config({
  accessKeyId: aws.ACCESS_ID,
  secretAccessKey: aws.ACCESS_SECRET,
  region: aws.REGION,
});

const s3 = AWS.S3(config);

module.exports.uploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketDetails.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { userId: req.payload._id });
    },
    key: function (req, file, cb) {
      cb(null, req.payload._id + "_" + req.body.fileName);
    },
  }),
});
