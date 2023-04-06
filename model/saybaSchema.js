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
  name: String,
  developer: String,
  state: String,
  city: String,
  possession: String,
  price: String,
  class: String,
  images: Object,
  amenities: Object,
  area: Object,
  config: Object,
});

const saybaGroupForm = mongoose.model("saybaGroupForm", saybaGroupFormSchema);
const saybaGroupProperty = mongoose.model(
  "saybaGroupProperty",
  saybaGroupPropertySchema
);
module.exports = { saybaGroupForm, saybaGroupProperty };
