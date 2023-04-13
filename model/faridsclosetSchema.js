const mongoose = require("mongoose");

const faridsclosetSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: String,
  color: String,
  brand: String,
  category: String,
});

//
const faridsclosetUserSchema = new mongoose.Schema({
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
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: Array,
    required: false,
  },
});

const faridscloset = mongoose.model("faridscloset", faridsclosetSchema);
const faridsclosetuser = mongoose.model(
  "faridsclosetuser",
  faridsclosetUserSchema
);
module.exports = { faridscloset, faridsclosetuser };
