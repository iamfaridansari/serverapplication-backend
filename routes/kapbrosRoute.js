const router = require("express").Router();
const {
  postProducts,
  getProducts,
  deleteProduct,
  postForm,
} = require("../controllers/kapbrosController");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

router.post("/post/kapbros/products", upload.single("image"), postProducts);

router.get("/get/kapbros/products", getProducts);

router.delete("/delete/kapbros/products", deleteProduct);

router.post("/post/kapbros/form", postForm);

module.exports = router;
