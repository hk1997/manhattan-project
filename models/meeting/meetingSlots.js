const mongoose = require("mongoose");

const meetingSlotsSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  startTime: { type: Date },
  endTime: { type: Date },
  date: { type: Date },
  available: { type: Boolean },
  reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
});

module.exports = mongoose.model("MeetingSlots", meetingSlotsSchema);
