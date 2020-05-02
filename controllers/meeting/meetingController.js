const helpers = require("../helpers");
const meetingModel = require("./meetingModel");

module.exports.addMeetingSlots = async (req, res) => {
  try {
    let requiredFields = ["startTime", "endTime", "timePerSlot"];
    let initializeData = await helpers.initializeData(requiredFields, req);
    if (!initializeData["valid"]) {
      return res.json({
        success: false,
        message: "Necessary Paramenters missing",
        data: {},
      });
    }
    let data = await meetingModel.addMeetingSlots(
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

module.exports.getMeetingSlotsDoctor = async (req, res) => {
  try {
    let requiredFields = ["date", "available"];
    let initializeData = await helpers.initializeData(requiredFields, req);
    if (!initializeData["valid"]) {
      return res.json({
        success: false,
        message: "Necessary Paramenters missing",
        data: {},
      });
    }
    let data = await meetingModel.getMeetingSlotsDoctor(
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

module.exports.getMeetingSlotsClient = async (req, res) => {
  try {
    let requiredFields = ["date"];
    let initializeData = await helpers.initializeData(requiredFields, req);
    if (!initializeData["valid"]) {
      return res.json({
        success: false,
        message: "Necessary Paramenters missing",
        data: {},
      });
    }
    let data = await meetingModel.getMeetingSlotsClient(
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

module.exports.bookMeeting = async (req, res) => {
  try {
    let requiredFields = ["meetingId"];
    let initializeData = await helpers.initializeData(requiredFields, req);
    if (!initializeData["valid"]) {
      return res.json({
        success: false,
        message: "Necessary Paramenters missing",
        data: {},
      });
    }
    let data = await meetingModel.bookMeeting(
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
