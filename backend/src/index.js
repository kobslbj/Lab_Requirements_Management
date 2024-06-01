const express = require("express");
const mongoose = require("mongoose");
const orderRoute = require("./routes/order.js");
const staffRoute = require("./routes/staff.js");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/orders", orderRoute);
app.use("/api/staffs", staffRoute);

const mongoURI = "mongodb://localhost:27017/lab_requirement_db";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
