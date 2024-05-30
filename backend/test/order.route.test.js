const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const orderRoute = require("../src/routes/order.js");

const app = express();
app.use(express.json());
app.use("/api/orders", orderRoute);

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

describe("Order API", () => {
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

    const res = await request(app)
      .post("/api/orders")
      .send(orderData)
      .expect(200);

    // console.log("Create Order Response:", res.body);
    expect(res.body.title).toBe(orderData.title);
    expect(res.body.description).toBe(orderData.description);
  });

  it("should get an order by ID", async () => {
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

    await request(app).post("/api/orders").send(orderData);

    const res = await request(app).get("/api/orders/2").expect(200);

    // console.log("Get Order by ID Response:", res.body);
    expect(res.body.title).toBe(orderData.title);
    expect(res.body.description).toBe(orderData.description);
  });
});
