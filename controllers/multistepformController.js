const multistepform = require("../model/multistepformSchema");

// post form
const postForm = async (req, res) => {
  const {
    firstname,
    lastname,
    dob,
    gender,
    phone,
    email,
    house,
    street,
    state,
    city,
    pin,
    company,
    designation,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !dob ||
    !gender ||
    !phone ||
    !email ||
    !house ||
    !street ||
    !state ||
    !city ||
    !pin ||
    !company ||
    !designation
  ) {
    return res.status(422).json({ message: "Enter complete details" });
  } else {
    try {
      const newform = new multistepform({
        firstname,
        lastname,
        dob,
        gender,
        phone,
        email,
        house,
        street,
        state,
        city,
        pin,
        company,
        designation,
      });
      await newform.save();
      res.status(200).json({
        message1: "Your response have been saved",
        message2: "We will reach out to you soon",
      });
    } catch (error) {
      console.log(error);
    }
  }
};

// get form
const getForms = async (req, res) => {
  try {
    const forms = await multistepform.find();
    if (forms) {
      res.status(200).json(forms);
    } else {
      return res.status(422).json({ message: "Failed to fetch" });
    }
  } catch (error) {
    console.log(error);
  }
};

// delete form
const deleteForm = async (req, res) => {
  try {
    const { id } = req.body;
    await multistepform.findByIdAndDelete(id);
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postForm, getForms, deleteForm };
