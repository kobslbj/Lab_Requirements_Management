const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const FileSchema = new mongoose.Schema({
  length: { type: Number, required: true },
  chunkSize: { type: Number, required: true },
  uploadDate: { type: Date, required: true },
  filename: { type: String, required: true },
  md5: { type: String, required: true },
  contentType: { type: String, required: true },
});

const OrderSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: Number, required: true },
    description: { type: String, required: true },
    creator: { type: String, required: true },
    fab_id: { type: String, required: true },
    lab_id: { type: String, required: true },
    priority: { type: Number, required: true },
    is_completed: { type: Boolean, required: true, default: false },
    attachments: [
      {
        uuid: { type: String, default: uuidv4 },
        file: { type: mongoose.Schema.Types.ObjectId, ref: "uploads.files" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("uploads.files", FileSchema);
const Order = mongoose.model("Order_collection", OrderSchema);
module.exports = { Order, File };
