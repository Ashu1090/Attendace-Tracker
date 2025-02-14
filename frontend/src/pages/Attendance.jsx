import React, { useState } from 'react';
import {
  Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Select, MenuItem, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, Grid, Card, CardContent
} from '@mui/material';
import { motion } from 'framer-motion';

const Attendance = () => {
  const initialStudents = [
    { id: 1, name: 'Ajith', rollNo: '22101' },
    { id: 2, name: 'Arasu', rollNo: '22102' },
    { id: 3, name: 'Dinesh', rollNo: '22103' },
    { id: 4, name: 'Guna', rollNo: '22104' },
    { id: 5, name: 'Hariharan', rollNo: '22105' },
    { id: 6, name: 'Hari Krishnan', rollNo: '22106' },
    { id: 7, name: 'Lakshmanan', rollNo: '22107' },
    { id: 8, name: 'Malik', rollNo: '22108' },
    { id: 9, name: 'Mohammed Rafik', rollNo: '22109' },
    { id: 10, name: 'Mohammed Ashiq', rollNo: '22110' },
  ];

  const [attendance, setAttendance] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // Generate random percentages (70% and above) for each student
  const generateRandomPercentage = () => {
    return (Math.random() * 30 + 70).toFixed(2) + '%';
  };

  const handleAttendanceChange = (id, value) => {
    setAttendance({ ...attendance, [id]: value });
  };

  const calculatePercentage = (present, total) => {
    return ((present / total) * 100).toFixed(2) + '%';
  };

  const saveAttendance = () => {
    setOpenDialog(true);
    setTimeout(() => setOpenDialog(false), 2000);
  };

  const filteredStudents = initialStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.includes(searchQuery)
  );

  // Dummy data for past 3 days
  const past3DaysAttendance = [
    { date: '2025-10-03', present: 8, absent: 2 },
    { date: '2025-10-04', present: 9, absent: 1 },
    { date: '2025-10-05', present: 7, absent: 3 },
  ];

  // Dummy data for past 3 months
  const past3MonthsAttendance = [
    { month: 'July 2023', present: 80, absent: 20 },
    { month: 'August 2023', present: 85, absent: 15 },
    { month: 'September 2023', present: 75, absent: 25 },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" sx={{ bgcolor: 'violet', color: 'white', p: 2, borderRadius: 2, width: '100%', textAlign: 'center' }}>
        Attendance Management
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <TextField label="Search by Name or Roll No" variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <TextField label="Select Date" type="date" InputLabelProps={{ shrink: true }} value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
      </Box>

      <TableContainer component={Paper} sx={{ mt: 3, width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1863d1', color: '#fff' }}>
              <TableCell sx={{ color: '#fff' }}>S.No</TableCell>
              <TableCell sx={{ color: '#fff' }}>Student Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Roll No</TableCell>
              <TableCell sx={{ color: '#fff' }}>Attendance Status</TableCell>
              <TableCell sx={{ color: '#fff' }}>Monthly Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>
                  <Select value={attendance[student.id] || 'Present'} onChange={(e) => handleAttendanceChange(student.id, e.target.value)} sx={{ minWidth: 120 }}>
                    <MenuItem value="Present">Present</MenuItem>
                    <MenuItem value="Absent">Absent</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{generateRandomPercentage()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={saveAttendance}>
        Save Attendance
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>Attendance saved successfully!</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Past 3 Days Attendance */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: '#1863d1' }}>
        Past 3 Days Attendance
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1863d1', color: '#fff' }}>
              <TableCell sx={{ color: '#fff' }}>Date</TableCell>
              <TableCell sx={{ color: '#fff' }}>Present</TableCell>
              <TableCell sx={{ color: '#fff' }}>Absent</TableCell>
              <TableCell sx={{ color: '#fff' }}>Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {past3DaysAttendance.map((day, index) => (
              <TableRow key={index}>
                <TableCell>{day.date}</TableCell>
                <TableCell>{day.present}</TableCell>
                <TableCell>{day.absent}</TableCell>
                <TableCell>{calculatePercentage(day.present, day.present + day.absent)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Past 3 Months Attendance */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2, color: '#1863d1' }}>
        Past 3 Months Attendance
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1863d1', color: '#fff' }}>
              <TableCell sx={{ color: '#fff' }}>Month</TableCell>
              <TableCell sx={{ color: '#fff' }}>Present</TableCell>
              <TableCell sx={{ color: '#fff' }}>Absent</TableCell>
              <TableCell sx={{ color: '#fff' }}>Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {past3MonthsAttendance.map((month, index) => (
              <TableRow key={index}>
                <TableCell>{month.month}</TableCell>
                <TableCell>{month.present}</TableCell>
                <TableCell>{month.absent}</TableCell>
                <TableCell>{calculatePercentage(month.present, month.present + month.absent)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Attendance;