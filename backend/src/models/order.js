const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    title: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    creator: {
      type: String,
      required: true,
    },

    fab_id: {
      type: String,
      required: true,
    },

    lab_id: {
      type: String,
      required: true,
    },

    priority: {
      type: Number,
      required: true,
    },

    is_completed: {
      type: Boolean,
      required: true,
      default: false,
    },

    attachment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fs.files", // Reference to GridFS files collection
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order_collection", OrderSchema);

module.exports = Order;
