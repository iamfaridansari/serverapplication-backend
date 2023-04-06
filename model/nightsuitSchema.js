const mongoose = require("mongoose");

const nightsuitproductsSchema = new mongoose.Schema({
  name: String,
  category: String,
  images: Object,
  mrp: String,
  price: String,
  color: String,
  fabric: String,
});

const nightsuitproducts = mongoose.model(
  "nightsuitproducts",
  nightsuitproductsSchema
);
module.exports = nightsuitproducts;
