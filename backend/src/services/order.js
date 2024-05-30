const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { Order, File } = require("../models/order.js");

const getOrders = async (title) => {
  try {
    const query = title ? { title } : {};
    const orders = await Order.find(query).populate("attachments.file");
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createOrder = async (orderData, files) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!orderData._id) {
      orderData._id = uuidv4();
    }

    if (files && files.file) {
      const attachments = [];
      const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });

      const filesArray = Array.isArray(files.file) ? files.file : [files.file];
      for (const file of filesArray) {
        if (file.mimetype === "application/pdf") {
          const hash = crypto.createHash("md5").update(file.data).digest("hex");
          const uploadStream = bucket.openUploadStream(file.name, {
            metadata: { contentType: file.mimetype, md5: hash },
          });

          await new Promise((resolve, reject) => {
            uploadStream.end(file.data);
            uploadStream.on("finish", () => {
              const uuid = uuidv4();
              attachments.push({ uuid, file: uploadStream.id });
              resolve();
            });
            uploadStream.on("error", (error) => {
              reject(error);
            });
          });
        } else {
        }
      }

      orderData.attachments = attachments;
    }

    const order = await Order.create(orderData);
    await session.commitTransaction();
    return order;
  } catch (error) {
    await session.abortTransaction();
    throw new Error(error.message);
  } finally {
    session.endSession();
  }
};

const updateOrder = async (orderId, orderData, files) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    // Update order fields
    if (orderData.title !== undefined) order.title = orderData.title;
    if (orderData.description !== undefined)
      order.description = orderData.description;
    if (orderData.priority !== undefined) order.priority = orderData.priority;
    if (orderData.lab_id !== undefined) order.lab_id = orderData.lab_id;

    if (files && files.file) {
      const attachments = [];
      const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });

      const filesArray = Array.isArray(files.file) ? files.file : [files.file];

      for (const file of filesArray) {
        if (file.mimetype === "application/pdf") {
          const hash = crypto.createHash("md5").update(file.data).digest("hex");
          const uploadStream = bucket.openUploadStream(file.name, {
            metadata: { contentType: file.mimetype, md5: hash },
          });

          await new Promise((resolve, reject) => {
            uploadStream.end(file.data);
            uploadStream.on("finish", () => {
              const uuid = uuidv4();
              attachments.push({ uuid, file: uploadStream.id });
              resolve();
            });
            uploadStream.on("error", (error) => {
              reject(error);
            });
          });
        }
      }

      order.attachments = attachments;
    }

    const updatedOrder = await order.save();
    await session.commitTransaction();
    return updatedOrder;
  } catch (error) {
    await session.abortTransaction();
    throw new Error(error.message);
  } finally {
    session.endSession();
  }
};

const markOrderAsCompleted = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    order.is_completed = true;

    const updatedOrder = await order.save();
    return updatedOrder;
  } catch (error) {
    console.error("Error in markOrderAsCompleted:", error);
    throw new Error(error.message);
  }
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  markOrderAsCompleted,
};
