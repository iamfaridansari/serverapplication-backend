const router = require("express").Router();
const { saybaGroupForm, saybaGroupProperty } = require("../model/saybaSchema");
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

router.post("/api/post/sayba/form", async (req, res) => {
  const { name, email, mobile, subject, query } = req.body;
  if (!name || !email || !mobile || !subject || !query) {
    return res.status(422).json({ message: "Enter complete details" });
  }
  try {
    const newMessage = new saybaGroupForm({
      name,
      email,
      mobile,
      subject,
      query,
    });
    await newMessage.save();
    res.status(200).json({ message: "Thank you for your feedback." });
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/get/sayba/form", async (req, res) => {
  try {
    const messages = await saybaGroupForm.find();
    if (messages) {
      res.status(200).json(messages);
    } else {
      return res.status(422).json({ message: "Failed to fetch" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/api/delete/sayba/form", async (req, res) => {
  const { id } = req.body;
  await saybaGroupForm.findByIdAndDelete(id);
  res.status(200).json({ message: "Message deleted" });
});

// property
router.post("/api/post/sayba/property", multipleUpload, async (req, res) => {
  const {
    name,
    city,
    location,
    address,
    possession,
    price,
    desc,
    amenities,
    area,
    config,
  } = req.body;
  const images = Object.values(req.files).flat(1);
  const amenities2 = JSON.parse(amenities);
  const area2 = JSON.parse(area);
  const config2 = JSON.parse(config);
  //
  if (
    !name ||
    !city ||
    !location ||
    !address ||
    !possession ||
    !price ||
    !desc ||
    !amenities ||
    !area ||
    !config
  ) {
    return res.status(422).json({ message: "Enter complete details" });
  }
  try {
    const newsaybaProperty = new saybaGroupProperty({
      name,
      city,
      location,
      address,
      possession,
      price,
      desc,
      amenities: amenities2,
      area: area2,
      config: config2,
      images,
    });
    await newsaybaProperty.save();
    res.status(200).json({ message: "Property saved" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/get/sayba/property", async (rer, res) => {
  try {
    const properties = await saybaGroupProperty.find();
    if (properties) {
      res.status(200).json(properties);
    } else {
      return res.status(422).json({ message: "Failed to fetch properties" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/view/sayba/property/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await saybaGroupProperty.findOne({ _id: id });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/api/delete/sayba/property", async (req, res) => {
  try {
    const { id } = req.body;
    await saybaGroupProperty.findByIdAndDelete(id);
    res.status(200).json({ message: "Property deleted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
