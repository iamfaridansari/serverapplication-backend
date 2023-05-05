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

// const nightsuitaddressSchema = new mongoose.Schema({
//   house: String,
//   state: String,
//   city: String,
//   landmark: String,
//   pincode: Number,
// });

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
// const nightsuitaddress = mongoose.model(
//   "nightsuitaddress",
//   nightsuitaddressSchema
// );
const nightsuitcoupon = mongoose.model(
  "nightsuitcoupon",
  nightsuitcouponSchema
);

module.exports = {
  nightsuitproducts,
  nightsuituser,
  // nightsuitaddress,
  nightsuitcoupon,
};
