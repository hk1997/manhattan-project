const router = require("express").Router();
const helpers = require("../controllers/helpers");
const meetingController = require("../controllers/meeting/meetingController");

/**
 * Route to add meeting slots
 * body: token
 * startTime time in milliseconds obtained using getTime()
 * endTime
 * timePerSlot
 */
router.post(
  "/add-meeting-slots",
  helpers.checkLogin,
  meetingController.addMeetingSlots
);

/**
 * Route to get meeting slots for doctor
 * body: token
 * date
 * available
 */
router.post(
  "/get-meeting-slots-doctor",
  helpers.checkLogin,
  meetingController.getMeetingSlotsDoctor
);

/**
 * Route to get meeting slots for client
 * body: token
 * date
 */
router.post(
  "/get-meeting-slots-client",
  helpers.checkLogin,
  meetingController.getMeetingSlotsClient
);

/**
 * Route to book meeting
 * body: meetingId
 * initiated by client
 */
router.post("/book-meeting", helpers.checkLogin, meetingController.bookMeeting);

module.exports = router;
