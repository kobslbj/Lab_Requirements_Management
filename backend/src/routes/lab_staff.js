const express = require("express");
const Lab_staff = require("../models/lab_staff.js");
const router = express.Router();
const {getStaffs, getStaff, createStaff, deleteStaff, signinStaff} = require('../services/lab_staff.js');


router.get('/', getStaffs);
router.get("/:id", getStaff);

router.post("/register", createStaff);
router.post("/signin", signinStaff);

// delete a Staff
router.delete("/:id", deleteStaff);


module.exports = router;