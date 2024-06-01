const express = require("express");
const {
  getOrders,
  createOrder,
  updateOrder,
  markOrderAsCompleted,
} = require("../services/order.js");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();

// get all orders
router.get("/", authenticateToken, async (req, res) => {
  try {
    const orders = await getOrders(req.user);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: error.message });
  }
});

// create order
router.post("/", authenticateToken, async (req, res) => {
  try {
    console.log(req)
    console.log("req.files", req.files)
    const order = await createOrder(req.body, req.user, req.files);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: error.message });
  }
});

// update order
router.put("/", authenticateToken, async (req, res) => {
  try {
    const orderId = req.body._id; // Ensure _id is included in the request body
    const updatedOrder = await updateOrder(orderId, req.body, req.files, req.user);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: error.message });
  }
});

// mark order as completed
router.put("/:orderId", authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await markOrderAsCompleted(orderId, req.user);
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error marking order as completed:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
