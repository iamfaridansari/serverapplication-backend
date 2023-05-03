const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

const authentication = require("../middleware/verifyToken");
const {
  postProducts,
  getProducts,
  deleteProduct,
  editProduct,
  userSignup,
  userLogin,
  authUser,
} = require("../controllers/faridclosetController");

router.post(
  "/post/faridscloset/products",
  upload.single("image"),
  postProducts
);

router.get("/get/faridscloset/products", getProducts);

router.post("/delete/faridscloset/products", deleteProduct);

router.put("/edit/faridscloset/products/:id", editProduct);

router.post("/signup/faridcloset/user", userSignup);

router.post("/login/faridcloset/user", userLogin);

router.get("/get/faridcloset/user", authentication, authUser);

module.exports = router;
