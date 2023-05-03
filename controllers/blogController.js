const mongoose = require("mongoose");
const { bloguser, blog } = require("../model/blogSchema");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!name || !email || !mobile || !password) {
    return res.status(422).json({ message: "Enter complete details" });
  }
  const userExist = await bloguser.findOne({ email: email });
  if (userExist) {
    return res.status(422).json({ message: "User already exist" });
  }
  try {
    const newUser = new bloguser({ name, email, mobile, password });
    await newUser.save();
    return res.status(200).json({
      message: "Account created successfully. Please login to continue",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ message: "Enter complete details" });
  }
  try {
    const userExist = await bloguser.findOne({ email: email });
    if (!userExist) {
      return res.status(422).json({ message: "User does not exist" });
    } else {
      if (userExist.password !== password) {
        return res.status(422).json({ message: "Incorrect credentials" });
      } else {
        const token = jwt.sign({ id: userExist._id }, process.env.secretkey);
        return res
          .status(200)
          .json({ message: "Login successful", token: token });
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// auth user
const authUser = (req, res) => {
  try {
    if (req.user) {
      res
        .status(200)
        .json({ message: "Authentication successful", user: req.user });
    } else {
      return res.status(422).json("Authentication failed");
    }
  } catch (error) {
    res.status(500).json("Authentication failed");
  }
};

// get user
const getUser = async (req, res) => {
  const { id } = req.body;
  try {
    const userExist = await bloguser.findById(id);
    const { password, ...others } = userExist._doc;
    res.status(200).json(others);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// post blog
const postBlog = async (req, res) => {
  const { title, body, user } = req.body;
  if (!title || !body || !user) {
    return res.status(422).json({ message: "Enter complete details" });
  }
  const userExist = await bloguser.findById(user);
  if (!userExist) {
    return res.status(422).json({ message: "Cannot post blog, please login." });
  }
  try {
    const newBlog = await blog({ title, body, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    userExist.blogs.push(newBlog);
    await userExist.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(200).json({
      message: "Blog posted",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await blog.find();
    if (blogs) {
      return res.status(200).json(blogs);
    } else {
      return res.status(422).json({ message: "Failed to fetch blogs" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// get single blog
const viewBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blogExist = await blog.findOne({ _id: id });
    return res.status(200).json(blogExist);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// update blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({ message: "Enter complete details" });
  }
  try {
    const updatedBlog = await blog.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ message: "Blog updated", blog: updatedBlog });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// delete blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await blog.findByIdAndDelete(id).populate("user");
    await deletedBlog.user.blogs.pull(deletedBlog);
    await deletedBlog.user.save();
    return res.status(200).json({ message: "blog deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// get user blog
const userBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const userBlogList = await bloguser.findById(id).populate("blogs");
    if (!userBlogList) {
      return res.status(404).json({ message: "Blogs not found" });
    }
    return res.status(200).json(userBlogList);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
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
};
