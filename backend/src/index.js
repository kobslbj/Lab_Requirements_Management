const express = require("express");
const mongoose = require("mongoose");
const Order = require("./models/order.js");
const Staff = require("./models/lab_staff.js");
const QAEngineer = require("./models/qa_engineer.js");
const orderRoute = require("./routes/order.js");
const staffRoute = require("./routes/lab_staff.js");
const qaEngineerRoute = require("./routes/qa_engineer.js");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use("/api/orders", orderRoute);
app.use("/api/staffs", staffRoute);
app.use("/api/qa_engineers", qaEngineerRoute);


mongoose
  .connect(
    "mongodb://localhost:27017/lab_requirement_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });