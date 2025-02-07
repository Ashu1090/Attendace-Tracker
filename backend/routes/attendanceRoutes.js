const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// ✅ Fetch all past attendance records
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.findAll();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attendance records" });
  }
});

// ✅ Save attendance for the current date
router.post("/", async (req, res) => {
  try {
    const { attendance } = req.body;

    await Attendance.bulkCreate(
      attendance.map((record) => ({
        studentId: record.studentId,
        studentName: record.name,
        rollNo: record.rollNo,
        status: record.status,
        date: new Date(),
      }))
    );

    res.json({ message: "Attendance saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save attendance" });
  }
});

module.exports = router;
