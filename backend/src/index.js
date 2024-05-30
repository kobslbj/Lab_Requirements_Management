const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const path = require("path");
const crypto = require("crypto");

const Order = require("./models/order.js");
const Staff = require("./models/lab_staff.js");
const QAEngineer = require("./models/qa_engineer.js");
const orderRoute = require("./routes/order.js");
const staffRoute = require("./routes/lab_staff.js");
const qaEngineerRoute = require("./routes/qa_engineer.js");
const { read } = require("fs");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/orders", orderRoute);
app.use("/api/staffs", staffRoute);
app.use("/api/qa_engineers", qaEngineerRoute);

const mongoURI = "mongodb://localhost:27017/lab_requirement_db";
const conn = mongoose.createConnection(mongoURI);

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileinfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileinfo);
      });
    });
  },
});
const upload = multer({ storage });

// route to upload file
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

// route to get files by id
app.get("/file/:id", (req, res) => {
  gfs.files.findOne(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({ err: "No such file exist" });
      }

      // check if image
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png"
      ) {
        // read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({ err: "Not an image" });
      }
    }
  );
});

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
