const mongoose = require("mongoose");

const faridsclosetSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: String,
  color: String,
  brand: String,
  category: String,
});

const faridscloset = mongoose.model("faridscloset", faridsclosetSchema);
module.exports = faridscloset;
