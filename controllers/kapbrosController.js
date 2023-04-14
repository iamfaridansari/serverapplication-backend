const { kapbrosImages, kapbrosForm } = require("../model/kapbrosSchema");

// post products
const postProducts = async (req, res) => {
  const image = req.file.path;
  try {
    if (!image) {
      return res.status(422).json({ message: "Please select an image" });
    } else {
      const newkapbrosImages = new kapbrosImages({ image });
      await newkapbrosImages.save();
      res.status(200).json({ message: "Image saved" });
    }
  } catch (error) {
    console.log(error);
  }
};

// get products
const getProducts = async (req, res) => {
  const images = await kapbrosImages.find();
  if (images) {
    res.status(200).json(images);
  }
};

// delete products
const deleteProduct = async (req, res) => {
  const { id } = req.body;
  await kapbrosImages.findByIdAndDelete(id);
  res.status(200).json({ message: "Image deleted" });
};

// post form
const postForm = async (req, res) => {
  const { name, email, phone, city, message } = req.body;
  if (!name || !email || !phone || !city || !message) {
    return res.status(422).json({ message: "Enter complete details" });
  } else {
    try {
      const newkapbrosForm = new kapbrosForm({
        name,
        email,
        phone,
        city,
        message,
      });
      await newkapbrosForm.save();
      res.status(200).json({ message: "Your response have been saved." });
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = { postProducts, getProducts, deleteProduct, postForm };
