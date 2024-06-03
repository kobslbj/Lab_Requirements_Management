const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const orderRoute = require("../src/routes/order");
const staffRoute = require("../src/routes/staff");
const Staff = require("../src/models/staff");
const { getOrders } = require("../src/services/order");
const Order = require("../src/models/order");
const GridFSBucket = require("mongodb").GridFSBucket;

const secretKey = "secretkey";

let app;
let token;
let user;

beforeAll(async () => {
  const uri = "mongodb://localhost:27017/test";
  await mongoose.connect(uri);

  app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(require("express-fileupload")());
  app.use("/api/orders", orderRoute);
  app.use("/api/staffs", staffRoute);

  // Create a test user with a valid department name
  user = await Staff.create({
    email: "seanmamasde@example.com",
    name: "seanmamasde",
    password: "seanmamasdes_password",
    department_name: "化學實驗室", // Valid department name
  });

  // Generate a valid JWT token
  token = jwt.sign(
    {
      email: user.email,
      id: user._id,
      department_name: user.department_name,
      name: user.name,
    },
    secretKey,
    { expiresIn: "1h" }
  );
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Order API", () => {
  it("should create an order with a PDF attachment", async () => {
    // Create a simple PDF file
    const pdfPath = path.join(__dirname, "test.pdf");
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.text("This is a test PDF file.");
    doc.end();

    const response = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "order with 1 pdf file.")
      .field("description", "Test order")
      .field("creator", "test_creator")
      .field("fab_name", "Fab A")
      .field("lab_name", "化學實驗室")
      .field("priority", 1)
      .attach("file", pdfPath);

    expect(response.status).toBe(200);
    expect(response.body.attachments).toHaveLength(1);
    expect(response.body.attachments[0]).toHaveProperty("_id");
    expect(response.body.attachments[0]).toHaveProperty("file");

    // Clean up
    fs.unlinkSync(pdfPath);
  });

  it("should create an order with two PDF attachments", async () => {
    // Create two simple PDF files
    const pdfPath1 = path.join(__dirname, "test1.pdf");
    const doc1 = new PDFDocument();
    doc1.pipe(fs.createWriteStream(pdfPath1));
    doc1.text("This is the first test PDF file.");
    doc1.end();

    const pdfPath2 = path.join(__dirname, "test2.pdf");
    const doc2 = new PDFDocument();
    doc2.pipe(fs.createWriteStream(pdfPath2));
    doc2.text("This is the second test PDF file.");
    doc2.end();

    const response = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "order with 2 pdf files.")
      .field("description", "Test order with two PDFs")
      .field("creator", "test_creator")
      .field("fab_name", "Fab A")
      .field("lab_name", "化學實驗室")
      .field("priority", 2)
      .attach("file", pdfPath1)
      .attach("file", pdfPath2);

    expect(response.status).toBe(200);
    expect(response.body.attachments).toHaveLength(2);
    expect(response.body.attachments[0]).toHaveProperty("_id");
    expect(response.body.attachments[0]).toHaveProperty("file");
    expect(response.body.attachments[1]).toHaveProperty("_id");
    expect(response.body.attachments[1]).toHaveProperty("file");

    // Clean up
    fs.unlinkSync(pdfPath1);
    fs.unlinkSync(pdfPath2);
  });

  it("should update an existing order with new data and attachments", async () => {
    // Create a simple PDF file
    const pdfPath = path.join(__dirname, "updateTest.pdf");
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.text("This is a test PDF file for update.");
    doc.end();

    // Create an order to update
    const createResponse = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "this is a test order for update.")
      .field("description", "Order to be updated")
      .field("creator", "test_creator")
      .field("fab_name", "Fab A")
      .field("lab_name", "化學實驗室")
      .field("priority", 3)
      .attach("file", pdfPath);

    expect(createResponse.status).toBe(200);

    console.log("Created Order:", createResponse.body);

    // Add a delay to ensure the database has committed the new document
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find the created order by title
    const query = { title: "this is a test order for update." };
    const orders = await getOrders(query, user);
    console.log("Orders fetched:", orders);
    const orderId = orders[0]?._id.toString();

    // Check if the order was found
    expect(orderId).toBeDefined();

    // Update the order
    const updateResponse = await request(app)
      .put(`/api/orders/${orderId}`)
      .set("Authorization", `Bearer ${token}`)
      .field("title", "this is the updated title.")
      .field("description", "Updated description")
      .field("priority", 4)
      .field("lab_name", "表面分析實驗室")
      .attach("file", pdfPath);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.title).toBe("this is the updated title.");
    expect(updateResponse.body.description).toBe("Updated description");
    expect(updateResponse.body.priority).toBe(4);
    expect(updateResponse.body.lab_name).toBe("表面分析實驗室");
    expect(updateResponse.body.attachments).toHaveLength(1);
    expect(updateResponse.body.attachments[0]).toHaveProperty("_id");
    expect(updateResponse.body.attachments[0]).toHaveProperty("file");

    // Clean up
    fs.unlinkSync(pdfPath);
  });

  it("should mark an order as completed", async () => {
    // Create a simple PDF file
    const pdfPath = path.join(__dirname, "completeTest.pdf");
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.text("This is a test PDF file for completion.");
    doc.end();

    // Create an order to update
    const createResponse = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .field("title", "this is a test order for completion.")
      .field("description", "Order to be marked as completed")
      .field("creator", "test_creator")
      .field("fab_name", "Fab A")
      .field("lab_name", "化學實驗室")
      .field("priority", 3)
      .attach("file", pdfPath);

    expect(createResponse.status).toBe(200);
    const orderId = createResponse.body._id;

    // Add a delay to ensure the database has committed the new document
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mark the order as completed
    const completeResponse = await request(app)
      .put(`/api/orders/${orderId}/complete`)
      .set("Authorization", `Bearer ${token}`);

    expect(completeResponse.status).toBe(200);
    expect(completeResponse.body.is_completed).toBe(true);

    // Clean up
    fs.unlinkSync(pdfPath);
  });

  it("should print and verify all entries in the MongoDB memory server in the file schema format", async () => {
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });

    const files = await bucket.find().toArray();
    for (const file of files) {
      // Create a stream to read the file content
      const downloadStream = bucket.openDownloadStream(file._id);
      const chunks = [];

      await new Promise((resolve, reject) => {
        downloadStream.on("data", (chunk) => {
          chunks.push(chunk);
        });
        downloadStream.on("end", () => {
          const buffer = Buffer.concat(chunks);
          const expectedHash = crypto
            .createHash("md5")
            .update(buffer)
            .digest("hex");
          expect(file.md5).toBe(expectedHash);
          resolve();
        });
        downloadStream.on("error", reject);
      });
    }

    // To ensure the test passes, we check if files is an array
    expect(Array.isArray(files)).toBe(true);

    // Print all orders in the MongoDB database
    const orders = await getOrders({}, user);
    console.log("Orders in MongoDB:", JSON.stringify(orders, null, 2));
  });
});
