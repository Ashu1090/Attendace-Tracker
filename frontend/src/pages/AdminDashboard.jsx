import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, CssBaseline, Box, Grid, Card, CardContent, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import SideNavbar from '../components/SideNavbar';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function EditEventsModal({ open, onClose, events, onSave }) {
  const [editedEvents, setEditedEvents] = useState(events.join('\n'));

  const handleSave = () => {
    onSave(editedEvents.split('\n'));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Upcoming Events</DialogTitle>
      <DialogContent>
        <TextField multiline rows={4} fullWidth value={editedEvents} onChange={(e) => setEditedEvents(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([
    "Upcoming event: Annual Day on March 10th."
  ]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSaveEvents = (newEvents) => {
    setUpcomingEvents(newEvents);
  };

  const pieData = {
    labels: ['Present', 'Absent'],
    datasets: [{
      label: 'Attendance',
      data: [75, 25],
      backgroundColor: ['#4caf50', '#f44336'],
      hoverBackgroundColor: ['#66bb6a', '#e57373'],
    }],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Attendance %',
      data: [90, 89, 94, 83, 78],
      backgroundColor: '#2196f3',
    }],
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#1976d2' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>Admin Dashboard</Typography>
          <IconButton color="inherit"><NotificationsActiveIcon /></IconButton>
          <IconButton color="inherit"><AccountCircleIcon /></IconButton>
        </Toolbar>
      </AppBar>

      <SideNavbar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f4f4f4', mt: { xs: 7, sm: 8 } }}>
        <Typography variant="h4" marginTop="-40px" textAlign="center">Welcome to the Admin Dashboard</Typography>
        <Typography variant="body1" textAlign="center" mb={2}>Overview of attendance data and system insights.</Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Attendance Overview</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Pie data={pieData} width={150} height={150} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6">Monthly Attendance</Typography>
                <Bar data={barData} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Quick Stats</Typography>
                <Typography>Total Students: 50</Typography>
                <Typography>Active Classes: 3</Typography>
                <Typography>Avg Attendance: 85%</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} startIcon={<TrendingUpIcon />} onClick={() => navigate('/reports')}>View Reports</Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Settings</Typography>
                <Typography>Manage your preferences.</Typography>
                <Button variant="contained" color="secondary" sx={{ mt: 2 }} startIcon={<SettingsIcon />} onClick={() => navigate('/setting')}>Go to Settings</Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Announcements</Typography>
                {upcomingEvents.map((event, index) => (
                  <Typography key={index}>{event}</Typography>
                ))}
                <Divider sx={{ my: 1 }} />
                <Button variant="contained" color="primary" onClick={() => setEditModalOpen(true)}>Edit Events</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <EditEventsModal open={editModalOpen} onClose={() => setEditModalOpen(false)} events={upcomingEvents} onSave={handleSaveEvents} />
      </Box>
    </Box>
  );
}

export default AdminDashboard;
