const colors = require("colors");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected".america);
  })
  .catch((error) => {
    console.log(error);
  });
