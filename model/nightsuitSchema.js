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
  addressList: [
    {
      address: {
        type: String,
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

nightsuituserSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.secretkey);
  this.tokens = this.tokens.concat({ token: token });
  await this.save();
  return token;
};

const nightsuitaddressSchema = new mongoose.Schema({
  house: String,
  state: String,
  city: String,
  landmark: String,
  pincode: Number,
});

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
const nightsuitaddress = mongoose.model(
  "nightsuitaddress",
  nightsuitaddressSchema
);
const nightsuitcoupon = mongoose.model(
  "nightsuitcoupon",
  nightsuitcouponSchema
);

module.exports = {
  nightsuitproducts,
  nightsuituser,
  nightsuitaddress,
  nightsuitcoupon,
};
