const mongoose = require("mongoose");

const saybaGroupFormSchema = new mongoose.Schema({
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
  subject: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
});

const saybaGroupPropertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  possession: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  amenities: {
    type: Array,
    required: true,
  },
  area: {
    type: Array,
    required: true,
  },
  config: {
    type: Array,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
});

const saybaGroupForm = mongoose.model("saybaGroupForm", saybaGroupFormSchema);
const saybaGroupProperty = mongoose.model(
  "saybaGroupProperty",
  saybaGroupPropertySchema
);
module.exports = { saybaGroupForm, saybaGroupProperty };
