const router = require("express").Router();
const {
  adminSignup,
  adminLogin,
  authAdmin,
} = require("../controllers/adminController");
const authentication = require("../middleware/verifyToken");

router.post("/post/admin/signup", adminSignup);

router.post("/post/admin/login", adminLogin);

router.get("/auth", authentication, authAdmin);

module.exports = router;
