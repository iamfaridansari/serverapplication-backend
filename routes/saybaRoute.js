const router = require("express").Router();
const saybaGroupForm = require("../model/saybaSchema");

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
  const messages = await saybaGroupForm.find();
  if (messages) {
    res.status(200).json(messages);
  } else {
    return res.status(422).json({ message: "Failed to fetch" });
  }
});

router.delete("/api/delete/sayba/form", async (req, res) => {
  const { id } = req.body;
  await saybaGroupForm.findByIdAndDelete(id);
  res.status(200).json({ message: "Message deleted" });
});

module.exports = router;
