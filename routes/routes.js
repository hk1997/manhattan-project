const router = require("express").Router();
const helpers = require("../controllers/helpers");


router.get("/", (req, res) => {
	res.send("works");
});

module.exports = router;
