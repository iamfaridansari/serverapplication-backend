const router = require("express").Router();
const {
  postForm,
  getForms,
  deleteForm,
} = require("../controllers/multistepformController");

router.post("/post/multistepform/form", postForm);

router.get("/get/multistepform/form", getForms);

router.delete("/delete/multistepform/form", deleteForm);

module.exports = router;
