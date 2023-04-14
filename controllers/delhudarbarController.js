const delhidarbarform = require("../model/delhidarbarSchema");

// post form
const postForm = async (req, res) => {
  const { name, phone, email, company, date, people, budget, type, message } =
    req.body;
  if (
    !name ||
    !phone ||
    !email ||
    !company ||
    !date ||
    !people ||
    !budget ||
    !type ||
    !message
  ) {
    return res.status(422).json({ message: "Enter complete details" });
  } else {
    try {
      const newDelhidarbar = new delhidarbarform({
        name,
        phone,
        email,
        company,
        date,
        people,
        budget,
        type,
        message,
      });
      await newDelhidarbar.save();
      res.status(200).json({ message: "Your response have been saved." });
    } catch (error) {
      console.log(error);
    }
  }
};

const getForms = async (req, res) => {
  const data = await delhidarbarform.find();
  if (data) {
    res.status(200).json(data);
  } else {
    return res.status(422).json({ message: "Failed to fetch" });
  }
};

module.exports = { postForm, getForms };
