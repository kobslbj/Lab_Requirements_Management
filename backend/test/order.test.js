const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../src/services/order");
const Order = require("../src/models/order");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Order Service", () => {
  it("should create a new order", async () => {
    const orderData = {
      _id: "1",
      title: 1,
      description: "Test Order",
      creator: "Creator1",
      fab_id: "Fab1",
      lab_id: "Lab1",
      priority: 1,
      is_completed: false,
    };

    const order = await createOrder(orderData);
    expect(order.title).toBe(orderData.title);
    expect(order.description).toBe(orderData.description);
  });

  it("should retrieve an order", async () => {
    const orderData = {
      _id: "2",
      title: 2,
      description: "Test Order 2",
      creator: "Creator2",
      fab_id: "Fab2",
      lab_id: "Lab2",
      priority: 2,
      is_completed: false,
    };

    await createOrder(orderData);
    const order = await getOrder("2");
    expect(order.title).toBe(orderData.title);
    expect(order.description).toBe(orderData.description);
  });
});
