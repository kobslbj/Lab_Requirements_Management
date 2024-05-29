const express = require("express");
const QA_engineer = require("../models/qa_engineer.js");
const router = express.Router();
const {getQAEngineers, getQAEngineer, createQAEngineer, deleteQAEngineer} = require('../services/qa_engineer.js');


router.get('/', getQAEngineers);
router.get("/:id", getQAEngineer);

router.post("/register", createQAEngineer);

// delete a QAEngineer
router.delete("/:id", deleteQAEngineer);


module.exports = router;