const router = require("express").Router();
const authController = require("../controllers/staff/auth/authController");
const helpers = require("../controllers/helpers");


router.get("/", (req, res) => {
    res.send("works");
});

/**  Routes for Authentication */
router.get("/auth/failure", (req, res) => {
    res.json({
        success: false,
        message: "Please check your login details",
        data: {}
    });
});

// /** Send OTP for otp based login
//  *  body:{'phone':'+91 your_no'}
//  * Please note there is a space in between +91 and your_no
//  * response: Success notification
//  */
router.post("/auth/send-otp", authController.sendOtp);

/** Verification of otp
 * body:{'phone':'+91 your_no','otp':}
 * Please note there is a space in between +91 and your_no
 * response: jwt token with _id as req.payload
 */
router.post("/auth/verify-otp", authController.verifyOtp);

router.post("/checkLogin", helpers.checkLogin, (req, res) => {
    res.json(req.payload);
});

module.exports = router;
