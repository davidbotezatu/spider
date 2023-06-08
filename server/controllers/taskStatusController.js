const TaskStatus = require("../models/TaskStatus");

exports.getTaskStatus = async (req, res) => {
  try {
    const statuses = await TaskStatus.findAll();
    res.json(statuses);
  } catch (error) {
    console.log("Eroare taskStatusController - getTaskStatus: ", error);
    res.status(500).json({ error: "Server error" });
  }
};
