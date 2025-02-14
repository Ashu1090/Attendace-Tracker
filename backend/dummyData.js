const Attendance = require("./models/Attendance");
const sequelize = require("./config/db");

const dummyData = async () => {
  await sequelize.sync({ force: true }); // Reset database
  
  const students = [
    { id: 1, name: "Ajith", rollNo: "22101" },
    { id: 2, name: "Arasu", rollNo: "22102" },
    { id: 3, name: "Dinesh", rollNo: "22103" },
    { id: 4, name: "Guna", rollNo: "22104" },
    { id: 5, name: "Hariharan", rollNo: "22105" },
    { id: 6, name: "Hari Krishnan", rollNo: "22106" },
    { id: 7, name: "Lakshmanan", rollNo: "22107" },
    { id: 8, name: "Malik", rollNo: "22108" },
    { id: 9, name: "Mohammed Rafik", rollNo: "22109" },
    { id: 10, name: "Mohammed Ashiq", rollNo: "22110" },
  ];

  const dates = [...Array(5)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  });

  const attendanceData = [];

  dates.forEach(date => {
    students.forEach(student => {
      const status = Math.random() > 0.3 ? "Present" : "Absent"; // 70% present rate
      attendanceData.push({ studentId: student.id, name: student.name, rollNo: student.rollNo, status, date });
    });
  });

  await Attendance.bulkCreate(attendanceData);
  console.log("Dummy data added ✅");
};

dummyData();
