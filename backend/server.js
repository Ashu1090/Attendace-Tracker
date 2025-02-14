const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes"); // ✅ Added

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", attendanceRoutes);
 // ✅ Connected attendance routes

app.post("/api/attendance", (req, res) => {
    const attendanceData = req.body.attendance;
    if (!attendanceData) return res.status(400).json({ error: "No attendance data provided" });
  
    const values = attendanceData.map(({ studentId, name, rollNo, status }) => [studentId, name, rollNo, status]);
  
    const sql = "INSERT INTO attendance (student_id, name, roll_no, status) VALUES ?";
    db.query(sql, [values], (err) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ error: "Failed to save attendance" });
      }
      res.json({ message: "Attendance saved successfully" });
    });
  });
  
  // Fetch Past Attendance
  app.get("/api/attendance", (req, res) => {
    const sql = "SELECT * FROM attendance";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).json({ error: "Failed to fetch attendance" });
      }
      res.json(results);
    });
  });
  

sequelize.sync().then(() => console.log("Database connected"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
