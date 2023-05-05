const router = require("express").Router();
const {
  postProducts,
  getProducts,
  deleteProduct,
  viewProduct,
  userSignup,
  userLogin,
  postAddress,
  getAddress,
  deleteAddress,
  postCoupon,
  getCoupon,
  deleteCoupon,
  applyCoupon,
  authUser,
} = require("../controllers/nightsuitController");
const authentication = require("../middleware/verifyToken");
const {
  nightsuitproducts,
  nightsuituser,
  nightsuitcoupon,
} = require("../model/nightsuitSchema");
//
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });
const multipleUpload = upload.fields([
  { name: "image1" },
  { name: "image2" },
  { name: "image3" },
  { name: "image4" },
]);
//

router.post("/post/nightsuit/products", multipleUpload, postProducts);

router.get("/get/nightsuit/products", getProducts);

router.post("/delete/nightsuit/products", deleteProduct);

router.get("/view/nightsuit/products/:id", viewProduct);

//
router.post("/signup/nightsuit/user", userSignup);

router.post("/login/nightsuit/user", userLogin);

router.get("/auth/nightsuit/user", authentication, authUser);

//
router.post("/post/nightsuit/address", postAddress);

router.post("/get/nightsuit/address", getAddress);

router.delete("/delete/nightsuit/address", deleteAddress);

//
router.post("/post/nightsuit/coupon", postCoupon);

router.get("/get/nightsuit/coupon", getCoupon);

router.delete("/delete/nightsuit/coupon", deleteCoupon);

router.post("/apply/nightsuit/coupon", applyCoupon);

module.exports = router;
