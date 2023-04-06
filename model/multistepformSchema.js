const mongoose = require("mongoose");

const multistepformSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  dob: String,
  gender: String,
  phone: String,
  email: String,
  house: String,
  street: String,
  state: String,
  city: String,
  pin: String,
  company: String,
  designation: String,
});

const multistepform = mongoose.model("multistepform", multistepformSchema);

module.exports = multistepform;
