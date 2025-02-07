import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';

const Attendance = () => {
  // Dummy Students (Fetch from Frontend - Replace with API later)
  const initialStudents = [
    { id: 1, name: 'Ajith ', rollNo: '22101' },
    { id: 2, name: 'Arasu', rollNo: '22102' },
    { id: 3, name: 'Dinesh ', rollNo: '22103' },
    { id: 4, name: 'Guna', rollNo: '22104' },
    { id: 5, name: 'Hariharan', rollNo: '22105' },
    { id: 6, name: 'Hari Krishnan', rollNo: '22106' },
    { id: 7, name: 'Lakshmanan', rollNo: '22107' },
    { id: 8, name: 'Malik' , rollNo: '22108' },
    { id: 9, name: 'Mohammed Rafik', rollNo: '22109' },
    { id: 10, name: 'Mohammed Ashiq', rollNo: '22110' },
  ];

  // State for Attendance Data
  const [attendance, setAttendance] = useState({});
  const [pastAttendance, setPastAttendance] = useState([]);

  // Load Past Attendance Data (Simulated Backend Data)
  useEffect(() => {
    const dummyPastAttendance = [
      { date: '2025-01-01', present: 8, absent: 2 },
      { date: '2025-01-02', present: 7, absent: 3 },
      { date: '2025-01-03', present: 9, absent: 1 },
      { date: '2025-01-04', present: 6, absent: 4 },
      { date: '2025-01-05', present: 10, absent: 0 },
    ];
    setPastAttendance(dummyPastAttendance);
  }, []);

  // Handle Attendance Selection
  const handleAttendanceChange = (id, value) => {
    setAttendance({ ...attendance, [id]: value });
  };

  // Calculate Attendance Percentage
  const calculateAttendancePercentage = () => {
    const totalStudents = initialStudents.length;
    const presentCount = Object.values(attendance).filter((status) => status === 'Present').length;
    return ((presentCount / totalStudents) * 100).toFixed(2);
  };

  // Save Attendance to Backend
  const saveAttendance = async () => {
    try {
      const attendanceData = initialStudents.map((student) => ({
        studentId: student.id,
        name: student.name,
        rollNo: student.rollNo,
        status: attendance[student.id] || 'Absent',
      }));

      await axios.post('http://localhost:5000/api/attendance', { attendance: attendanceData });

      alert('Attendance Saved Successfully!');

      // Reset Attendance Data
      setAttendance({});
    } catch (error) {
      console.error('Error saving attendance:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" component={motion.div} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        Attendance Management
      </Typography>

      {/* Attendance Table */}
      <TableContainer component={Paper} sx={{ mt: 3, width: '100%' }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1863d1', color: '#fff' }}>
              <TableCell sx={{ color: '#fff' }}>S.No</TableCell>
              <TableCell sx={{ color: '#fff' }}>Student Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Roll No</TableCell>
              <TableCell sx={{ color: '#fff' }}>Attendance Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {initialStudents.map((student, index) => (
              <TableRow key={student.id} component={motion.tr} whileHover={{ scale: 1.02 }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>
                  <Select
                    value={attendance[student.id] || 'Present'}
                    onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="Present">Present</MenuItem>
                    <MenuItem value="Absent">Absent</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Attendance Percentage */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        Attendance Percentage: {calculateAttendancePercentage()}%
      </Typography>

      {/* Save Attendance Button */}
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={saveAttendance} component={motion.button} whileHover={{ scale: 1.1 }}>
        Save Attendance
      </Button>

      {/* Past Attendance Records */}
      <Card sx={{ mt: 4, width: '80%' }}>
        <CardContent>
          <Typography variant="h6">Past Attendance Records</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Present</TableCell>
                <TableCell>Absent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pastAttendance.map((record, index) => (
                <TableRow key={index} component={motion.tr} whileHover={{ scale: 1.02 }}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.present}</TableCell>
                  <TableCell>{record.absent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Attendance;
