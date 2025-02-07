import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Grid, TextField, Button } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AnnouncementIcon from "@mui/icons-material/Announcement";

const attendanceData = [
  { month: "Jan", attendance: 85 },
  { month: "Feb", attendance: 90 },
  { month: "Mar", attendance: 88 },
  { month: "Apr", attendance: 92 },
  { month: "May", attendance: 95 },
];

const StudentDashboard = () => {
  const [studentName, setStudentName] = useState("Student");
  const [upcomingClass, setUpcomingClass] = useState({ className: "Data Science", time: "1:15 - 2:15 PM" });
  const [upcomingEvent, setUpcomingEvent] = useState({ eventName: "Sports Day", date: "March 15" });
  const [isEditingClass, setIsEditingClass] = useState(false);
  const [isEditingEvent, setIsEditingEvent] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {studentName}!
        </Typography>

        <Grid container spacing={3}>
          {[{ icon: <EventNoteIcon sx={{ fontSize: 60, color: "green" }} />, title: "Upcoming Class", content: upcomingClass.className + " - " + upcomingClass.time, edit: isEditingClass, setEdit: setIsEditingClass, data: upcomingClass, setData: setUpcomingClass },
            { icon: <SchoolIcon sx={{ fontSize: 60, color: "blue" }} />, title: "Attendance", content: "92%" },
            { icon: <AnnouncementIcon sx={{ fontSize: 60, color: "red" }} />, title: "Upcoming Event", content: upcomingEvent.eventName + " - " + upcomingEvent.date, edit: isEditingEvent, setEdit: setIsEditingEvent, data: upcomingEvent, setData: setUpcomingEvent }
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 3, height: 250, width: "100%" }}>
                  {item.icon}
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>{item.title}</Typography>
                    {item.edit !== undefined ? (
                      item.edit ? (
                        <>
                          <TextField
                            label="Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={item.data.className || item.data.eventName}
                            onChange={(e) => item.setData({ ...item.data, className: e.target.value, eventName: e.target.value })}
                            sx={{ mb: 1 }}
                          />
                          <TextField
                            label="Time/Date"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={item.data.time || item.data.date}
                            onChange={(e) => item.setData({ ...item.data, time: e.target.value, date: e.target.value })}
                            sx={{ mb: 1 }}
                          />
                          <Button variant="contained" sx={{ backgroundColor: "#FF69B4", width: "100%" }} onClick={() => item.setEdit(false)}>Save</Button>
                        </>
                      ) : (
                        <>
                          <Typography variant="h6" sx={{ mt: 1 }}>{item.content}</Typography>
                          <Button variant="contained" sx={{ backgroundColor: "#FF69B4", mt: 2, width: "100%" }} onClick={() => item.setEdit(true)}>Edit</Button>
                        </>
                      )
                    ) : (
                      <Typography variant="h6" sx={{ mt: 1 }}>{item.content}</Typography>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Attendance Chart */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Attendance Overview
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendance" fill="#3f51b5" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </motion.div>
  );
};

export default StudentDashboard;
