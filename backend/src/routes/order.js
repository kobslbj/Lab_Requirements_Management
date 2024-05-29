const express = require("express");
const Order = require("../models/order.js");
const router = express.Router();
const {getOrders, getOrder, createOrder, updateOrder, deleteOrder} = require('../services/order.js');


router.get('/', getOrders);
router.get("/:id", getOrder);

router.post("/", createOrder);

// update a Order
router.put("/:id", updateOrder);

// delete a Order
router.delete("/:id", deleteOrder);


module.exports = router;