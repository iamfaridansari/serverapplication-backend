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

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const port = process.env.port;

require("./database/connection");

//
const adminRoute = require("./routes/adminRoute");
const saybaRoute = require("./routes/saybaRoute");
const delhidarbarRoute = require("./routes/delhidarbarRoute");
const kapbrosRoute = require("./routes/kapbrosRoute");
const faridclosetRoute = require("./routes/faridsclosetRoute");
const nightsuitRoute = require("./routes/nightsuitRoute");
const multistepformRoute = require("./routes/multistepformRoute");

app.use("/api/", adminRoute);
app.use("/api/", saybaRoute);
app.use("/api/", delhidarbarRoute);
app.use("/api/", kapbrosRoute);
app.use("/api/", faridclosetRoute);
app.use("/api/", nightsuitRoute);
app.use("/api/", multistepformRoute);

//
const colors = require("colors");
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.bgGreen);
});
