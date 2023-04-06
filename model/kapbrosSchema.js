const mongoose = require("mongoose");

const kapbrosSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

const kapbrosFromSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
  message: String,
});

const kapbrosImages = mongoose.model("kapbrosImages", kapbrosSchema);
const kapbrosForm = mongoose.model("kapbrosForm", kapbrosFromSchema);
module.exports = { kapbrosForm, kapbrosImages };
