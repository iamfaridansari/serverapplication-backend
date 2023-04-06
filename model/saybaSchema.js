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

const saybaGroupForm = mongoose.model("saybaGroupForm", saybaGroupFormSchema);
module.exports = saybaGroupForm;
