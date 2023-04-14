const colors = require("colors");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected".bgGreen);
  })
  .catch((error) => {
    console.log(error);
  });
