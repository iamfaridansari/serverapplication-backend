const mongoose = require("mongoose");

const delhidarbarformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  people: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
});

const delhidarbarform = mongoose.model("delhidarbarform", delhidarbarformSchema);
module.exports = delhidarbarform;
