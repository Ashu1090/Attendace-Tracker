const express = require("express");
const router = express.Router();
const Timetable = require("../models/TimeTable");

// 📌 Get timetable for a student
router.get("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const timetable = await Timetable.findAll({ where: { studentId } });
    res.json(timetable);
  } catch (error) {
    console.error("Error fetching timetable:", error);
    res.status(500).json({ error: "Failed to fetch timetable" });
  }
});

// 📌 Update timetable for a student
router.post("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const { timetable } = req.body;

    await Timetable.destroy({ where: { studentId } }); // Remove old data
    await Timetable.bulkCreate(
      timetable.map((entry) => ({
        studentId,
        className: entry.className,
        time: entry.time,
      }))
    );

    res.json({ message: "Timetable updated successfully!" });
  } catch (error) {
    console.error("Error updating timetable:", error);
    res.status(500).json({ error: "Failed to update timetable" });
  }
});

// 📌 Delete a class from timetable
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Timetable.destroy({ where: { id } });
    res.json({ message: "Class deleted successfully!" });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({ error: "Failed to delete class" });
  }
});

module.exports = router;
