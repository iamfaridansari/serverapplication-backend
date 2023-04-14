const router = require("express").Router();
const { postForm, getForms } = require("../controllers/delhudarbarController");

router.post("/post/delhidarbar/form", postForm);

router.get("/get/delhidarbar/form", getForms);

module.exports = router;
