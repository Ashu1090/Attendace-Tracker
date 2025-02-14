const Attendance = require("../models/Attendance");

// Save attendance for a specific day
exports.saveAttendance = async (req, res) => {
  try {
    const { attendance, date } = req.body;

    await Attendance.bulkCreate(attendance.map(entry => ({
      ...entry,
      date
    })));

    res.json({ message: "Attendance saved successfully ✅" });
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ message: "Error saving attendance ❌" });
  }
};

// Fetch attendance records for past 5 days
exports.getPastAttendance = async (req, res) => {
  try {
    const records = await Attendance.findAll({
      attributes: ["date", "status"],
    });

    const pastRecords = records.reduce((acc, record) => {
      const date = record.date;
      if (!acc[date]) {
        acc[date] = { present: 0, absent: 0 };
      }
      acc[date][record.status.toLowerCase()]++;
      return acc;
    }, {});

    res.json(Object.entries(pastRecords).map(([date, counts]) => ({
      date,
      present: counts.present,
      absent: counts.absent,
    })));
  } catch (error) {
    console.error("Error fetching past attendance:", error);
    res.status(500).json({ message: "Error fetching data ❌" });
  }
};
