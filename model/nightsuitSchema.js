const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const nightsuitproductsSchema = new mongoose.Schema({
  name: String,
  category: String,
  images: Object,
  mrp: String,
  price: String,
  color: String,
  fabric: String,
});

const nightsuituserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: Object,
});

const nightsuitordersSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  cart: {
    type: Array,
    required: true,
  },
  summary: {
    type: Object,
    required: true,
  },
});

nightsuituserSchema.methods.postAddress = async function (
  email,
  house,
  state,
  city,
  landmark,
  pincode
) {
  const newAddress = {
    email,
    house,
    state,
    city,
    landmark,
    pincode,
  };
  if (!this.address) {
    this.address = [newAddress];
    await this.save();
  } else {
    this.address = [...this.address, newAddress];
    await this.save();
  }
  return newAddress;
};

nightsuituserSchema.methods.deleteAddress = async function (filtered) {
  this.address = filtered;
  await this.save();
  return filtered;
};

const nightsuitcouponSchema = new mongoose.Schema({
  name: String,
  discount: Number,
  type: String,
});

//
const nightsuitproducts = mongoose.model(
  "nightsuitproducts",
  nightsuitproductsSchema
);
const nightsuituser = mongoose.model("nightsuituser", nightsuituserSchema);

const nightsuitcoupon = mongoose.model(
  "nightsuitcoupon",
  nightsuitcouponSchema
);

const nightsuitorders = mongoose.model(
  "nightsuitorders",
  nightsuitordersSchema
);

//

module.exports = {
  nightsuitproducts,
  nightsuituser,
  nightsuitorders,
  nightsuitcoupon,
};
