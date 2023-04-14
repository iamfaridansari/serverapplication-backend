const router = require("express").Router();
//
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const multipleUpload = upload.fields([
  { name: "image1" },
  { name: "image2" },
  { name: "image3" },
  { name: "image4" },
]);
//
const saybaController = require("../controllers/saybaController");

// form
router.post("/post/sayba/form", saybaController.getForms);
router.get("/get/sayba/form", saybaController.getForms);
router.delete("/delete/sayba/form", saybaController.deleteForm);

// property
router.post(
  "/post/sayba/property",
  multipleUpload,
  saybaController.postProperty
);
router.get("/get/sayba/property", saybaController.getAllProperty);
router.get("/view/sayba/property/:id", saybaController.getSingleProperty);
router.delete("/delete/sayba/property", saybaController.deleteProperty);

module.exports = router;
