const mongoose = require("mongoose");

const blogUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "blog",
    },
  ],
});

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "bloguser",
      required: true,
    },
  },
  { timestamps: true }
);

const bloguser = mongoose.model("bloguser", blogUserSchema);
const blog = mongoose.model("blog", blogSchema);

module.exports = { bloguser, blog };
