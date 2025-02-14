import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

function SideNavbar({ mobileOpen, handleDrawerToggle }) {
  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: 250,
          bgcolor: '#f4f4f4',
          color: '#000', // Changed to black for better visibility
          marginTop: '64px',
          height: 'calc(100vh - 64px)',
        },
      }}
    >
      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admindashboard" onClick={handleDrawerToggle}>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/students" onClick={handleDrawerToggle}>
              <ListItemText primary="Students" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/attendance" onClick={handleDrawerToggle}>
              <ListItemText primary="Attendance" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/setting" onClick={handleDrawerToggle}>
              <ListItemText primary="Setting" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/reports" onClick={handleDrawerToggle}>
              <ListItemText primary="Reports" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default SideNavbar;
