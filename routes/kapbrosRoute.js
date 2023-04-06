const router = require("express").Router();
const { kapbrosImages, kapbrosForm } = require("../model/kapbrosSchema");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

router.post("/api/post/kapbros/products", upload.single("image"), async (req, res) => {
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
});

router.get("/api/get/kapbros/products", async (req, res) => {
  const images = await kapbrosImages.find();
  if (images) {
    res.status(200).json(images);
  }
});

router.post("/api/delete/kapbros/products", async (req, res) => {
  const { id } = req.body;
  await kapbrosImages.findByIdAndDelete(id);
  res.status(200).json({ message: "Image deleted" });
});

router.post("/api/post/kapbros/form", async (req, res) => {
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
});

module.exports = router;
