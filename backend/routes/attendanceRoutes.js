const express = require("express");
const router = express.Router();
const { saveAttendance, getPastAttendance } = require("../controllers/attendanceController");

router.post("/attendance", saveAttendance);
router.get("/attendance", getPastAttendance);

module.exports = router;
