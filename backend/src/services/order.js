const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { Order, File } = require("../models/order.js");

const getOrders = async (user) => {
  try {
    let query = {};
    if (user.department_name === "Fab A" || user.department_name === "Fab B" || user.department_name === "Fab C") {
      query = { creator: user.email };
    }
    else {
      query = { lab_id: user.department_name };
    }
    let orders = await Order.find(query).populate("attachments.file");
    console.log("orders", orders);
    orders.sort((a, b) => b.createdAt - a.createdAt);
    orders.sort((a, b) => a.priority - b.priority);
    orders.sort((a, b) => (a.is_completed === b.is_completed)? 0 : a.is_completed? 1 : -1);
  
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createOrder = async (orderData, creator, files) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // deal with files
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
    // deal with creator
    orderData.creator = creator.email;
    orderData.fab_id = creator.department_name;

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

const updateOrder = async (orderId, orderData, files, user) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.is_completed) {
      throw new Error("Order is already completed");
    }
    if (order.creator !== user.email) {
      throw new Error("You are not allowed to update this order");
    }

    // Update order fields
    if (orderData.title !== undefined) order.title = orderData.title;
    // if (orderData.description !== undefined) order.description = orderData.description;
    order.description = order.description + "\nUpdate priority " + order.priority + " => " + orderData.priority + " at " + new Date().toLocaleString();
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

const markOrderAsCompleted = async (orderId, user) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.is_completed) {
      throw new Error("Order is already completed");
    }
    if (order.lab_id !== user.department_name){
      throw new Error("You are not allowed to mark this order as completed");
    }

    order.description = order.description + "\nMark as completed by " + user.email + " at " + new Date().toLocaleString();

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
