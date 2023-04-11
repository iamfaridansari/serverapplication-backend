const express = require("express");
const app = express();
app.use(express.json());

const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

const cors = require("cors");
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const port = process.env.port;

require("./database/connection");

app.use(require("./routes/adminRoute"));
app.use(require("./routes/saybaRoute"));
app.use(require("./routes/delhidarbarRoute"));
app.use(require("./routes/kapbrosRoute"));
app.use(require("./routes/faridsclosetRoute"));
app.use(require("./routes/nightsuitRoute"));
app.use(require("./routes/multistepformRoute"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
