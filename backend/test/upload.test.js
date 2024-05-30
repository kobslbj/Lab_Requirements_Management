const request = require("supertest");
const mongoose = require("mongoose");
const path = require("path");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/index.js");

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

describe("File Upload API", () => {
  it("should upload an image file", async () => {
    const res = await request(app)
      .post("/upload")
      .attach("file", path.join(__dirname, "test_image.jpg"))
      .expect(200);

    console.log("Upload Response:", res.body);
    expect(res.body.file).toHaveProperty("filename");
    expect(res.body.file).toHaveProperty("id");
  });

  it("should retrieve the uploaded image by ID", async () => {
    const uploadRes = await request(app)
      .post("/upload")
      .attach("file", path.join(__dirname, "test_image.jpg"))
      .expect(200);

    const fileId = uploadRes.body.file.id;

    const res = await request(app).get(`/file/${fileId}`).expect(200);

    expect(res.headers["content-type"]).toBe("image/jpeg");
  });
});
