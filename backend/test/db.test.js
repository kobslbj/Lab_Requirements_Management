// Import Mongoose and the Order model
const mongoose = require("mongoose");
const Order = require("../src/models/order");
const crypto = require("crypto");
console.log(
  crypto
    .randomBytes(Math.ceil(32 / 2))
    .toString("hex")
    .slice(0, 32)
);
// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/yourDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Create a new instance of the Order model with the data for the new document
    const newOrder = new Order({
      // use hash for _id
      _id: crypto
        .randomBytes(Math.ceil(32 / 2))
        .toString("hex")
        .slice(0, 32), // hash id
      title: 123, // Example title
      description: "Example description",
      creator: "Creator's name",
      fab_id: "fabId123", // Example fab ID
      lab_id: "labId456", // Example lab ID
      priority: 1, // Example priority
      is_completed: false, // Example completion status
      attachment: null, // Example attachment (if applicable)
    });

    // Save the new instance to the database
    newOrder
      .save()
      .then((savedOrder) => {
        console.log("New order saved:", savedOrder);
      })
      .catch((error) => {
        console.error("Error saving new order:", error);
      });
    // see what's in the DB
    Order.find()
      .then((orders) => {
        console.log("Orders in the database:", orders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });
