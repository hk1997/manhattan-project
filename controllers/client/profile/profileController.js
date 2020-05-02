const helpers = require("../../helpers");
const profileModel = require("./profileModel");

module.exports.completeProfile = async (req, res) => {
  try {
    let requiredFields = ["name", "email"];
    let initializeData = await helpers.initializeData(requiredFields, req);
    if (!initializeData["valid"]) {
      return res.json({
        success: false,
        message: "Necessary Paramenters missing",
        data: {},
      });
    }
    let data = await profileModel.completeProfile(
      req.payload._id,
      initializeData["data"]
    );
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Some error occured",
      data: {},
    });
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    let data = await profileModel.getProfile(req.payload._id);
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Some error occured",
      data: {},
    });
  }
};
