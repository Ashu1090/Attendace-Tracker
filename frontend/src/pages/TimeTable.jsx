import { useState } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Typography } from "@mui/material";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const times = ["1:15 - 2:15 PM", "2:15 - 3:15 PM", "3:15 - 3:30 PM(Interval)", "3:30 - 4:25 PM", "4:25 - 5:15 PM"];
const dummySubjects = ["Cloud Computing", "Software Engineering", "IoT", "Data Science"];

const Timetable = () => {
  const [timetable, setTimetable] = useState(
    days.reduce((acc, day) => {
      acc[day] = times.map((time) => (time.includes("Interval") ? "Interval" : dummySubjects[Math.floor(Math.random() * dummySubjects.length)]));
      return acc;
    }, {})
  );
  
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (day, index, value) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: prev[day].map((subject, idx) => (idx === index ? value : subject)),
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Student Timetable
      </Typography>
      <Button variant="contained" color="secondary" onClick={toggleEdit} sx={{ mb: 2 }}>
        {isEditing ? "Save Timetable" : "Edit Timetable"}
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2", color: "white" }}>
              <TableCell align="center" sx={{ color: "white" }}>Days</TableCell>
              {times.map((time) => (
                <TableCell key={time} align="center" sx={{ color: "white" }}>{time}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {days.map((day) => (
              <TableRow key={day}>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>{day}</TableCell>
                {timetable[day].map((subject, index) => (
                  <TableCell key={index} align="center">
                    {subject === "Interval" ? (
                      "Interval"
                    ) : (
                      isEditing ? (
                        <TextField
                          variant="outlined"
                          size="small"
                          value={subject}
                          onChange={(e) => handleChange(day, index, e.target.value)}
                        />
                      ) : (
                        subject
                      )
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Timetable;
