const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Please enter product name"],
    },

    title: {
      type: Number,
      required: true,
    },

    description: {
      type: Number,
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
        type: String,  // to be updated
        required: false,
    },
  },
  {
    timestamps: true,
  }
);


const Order = mongoose.model("Product", OrderSchema);

module.exports = Order;