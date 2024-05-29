const QAEngineer = require("../models/qa_engineer.js");

const getQAEngineers = async (req, res) => {
  try {
    const qaEngineer = await QAEngineer.find({});
    res.status(200).json(qaEngineer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQAEngineer = async (req, res) => {
  try {
    const { id } = req.params;
    const QAEngineer = await QAEngineer.findById(id);
    res.status(200).json(QAEngineer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createQAEngineer = async (req, res) => {
  try {
    const qaEngineer = await QAEngineer.create(req.body);
    res.status(200).json(qaEngineer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteQAEngineer = async (req, res) => {
  try {
    const { id } = req.params;

    const qaEngineer = await QAEngineer.findByIdAndDelete(id);

    if (!qaEngineer) {
      return res.status(404).json({ message: "QAEngineer not found" });
    }

    res.status(200).json({ message: "QAEngineer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQAEngineers,
  getQAEngineer,
  createQAEngineer,
  deleteQAEngineer,
};
