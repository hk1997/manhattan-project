const meetingSlots = require("../../models/meeting/meetingSlots");

module.exports.addMeetingSlots = async (doctorId, data) => {
  try {
    let startTime = parseInt(data["startTime"]);
    let endTime = parseInt(data["endTime"]);
    let totalTime = endTime - startTime;
    let timePerSlot = parseInt(data["timePerSlot"]);
    let countSlots = totalTime / timePerSlot;
    let insertArray = [];

    for (let i = 1; i <= countSlots; i++) {
      let newMeeting = {};
      newMeeting["startTime"] = new Date(startTime + i * timePerSlot);
      newMeeting["endTime"] = new Date(startTime + (i + 1) * timePerSlot);
      (newMeeting["date"] = new Date(new Date(startTime).toDateString())),
        (newMeeting["available"] = true);
      newMeeting["doctorId"] = doctorId;
      insertArray.push(newMeeting);
    }

    await meetingSlots.insertMany(insertArray);

    return { success: true, message: "Successful", data: {} };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Some error occured", data: {} };
  }
};

module.exports.getMeetingSlotsDoctor = async (doctorId, data) => {
  try {
    let meetings = await meetingSlots.find({
      doctorId: doctorId,
      date: new Date(data["date"]).toDateString(),
      available: data["available"],
    });
    return {
      success: true,
      message: "Successful",
      data: { meetings: meetings },
    };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Some error occured", data: {} };
  }
};

module.exports.getMeetingSlotsClient = async (clientId, data) => {
  try {
    let meetings = await meetingSlots.find({
      reservedBy: clientId,
      date: new Date(data["date"]).toDateString(),
    });
    return {
      success: true,
      message: "Successful",
      data: { meetings: meetings },
    };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Some error occured", data: {} };
  }
};

module.exports.bookMeeting = async (clientId, data) => {
  try {
    await meetingSlots.updateOne(
      { _id: data["meetingId"] },
      { $set: { reservedBy: clientId, available: false } }
    );
    return { success: true, message: "Successful", data: {} };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Some error occured", data: {} };
  }
};
