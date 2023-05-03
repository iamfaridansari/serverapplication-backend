const router = require("express").Router();

const {
  signup,
  login,
  authUser,
  getUser,
  postBlog,
  getBlogs,
  viewBlog,
  updateBlog,
  deleteBlog,
  userBlog,
} = require("../controllers/blogController");
const authentication = require("../middleware/verifyToken");

router.post("/post/bloguser/signup", signup);
router.post("/post/bloguser/login", login);
router.get("/bloguser/auth", authentication, authUser);
router.post("/post/bloguser/getuser", getUser);

router.post("/post/blog/postblog", postBlog);
router.get("/get/blog/getblogs", getBlogs);
router.get("/get/blog/viewblog/:id", viewBlog);
router.put("/update/blog/updateblog/:id", updateBlog);
router.delete("/delete/blog/deleteblog/:id", deleteBlog);
router.get("/get/blog/userblog/:id", userBlog);

module.exports = router;
