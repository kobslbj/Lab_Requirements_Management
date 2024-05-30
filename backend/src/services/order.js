const Order = require("../models/order.js");

const getOrders = async () => {
  try {
    const orders = await Order.find({});
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOrder = async (id) => {
  try {
    const order = await Order.findById(id);
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createOrder = async (orderData) => {
  try {
    const order = await Order.create(orderData);
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOrder = async (id, orderData) => {
  try {
    const order = await Order.findByIdAndUpdate(id, orderData, { new: true });

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteOrder = async (id) => {
  try {
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      throw new Error("Order not found");
    }

    return "Order deleted successfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
