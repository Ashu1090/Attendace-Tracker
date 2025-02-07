import { useState } from "react";
import { Card, CardContent, TextField, Button, Typography, Container, Box } from "@mui/material";

const ManualAttendance = () => {
  const [attended, setAttended] = useState(0);
  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(null);
  const [requiredClasses, setRequiredClasses] = useState(null);

  const calculatePercentage = () => {
    if (total > 0) {
      const percent = ((attended / total) * 100).toFixed(2);
      setPercentage(percent);
      setRequiredClasses(null);
    }
  };

  const calculateRequiredClasses = () => {
    let needed = 0;
    let newAttended = attended;
    let newTotal = total;
    while ((newAttended / newTotal) * 100 < 75) {
      needed++;
      newAttended++;
      newTotal++;
    }
    setRequiredClasses(needed);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card sx={{ width: '100%', p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Attendance Calculator
            </Typography>
            <TextField
              fullWidth
              label="Classes Attended"
              type="number"
              value={attended}
              onChange={(e) => setAttended(Number(e.target.value))}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Total Classes"
              type="number"
              value={total}
              onChange={(e) => setTotal(Number(e.target.value))}
              margin="normal"
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" color="primary" onClick={calculatePercentage} fullWidth sx={{ mr: 1 }}>
                Calculate %
              </Button>
              <Button variant="contained" color="success" onClick={calculateRequiredClasses} fullWidth sx={{ ml: 1 }}>
                Need 75%?
              </Button>
            </Box>
            {percentage !== null && (
              <Typography variant="body1" align="center" mt={2}>
                Your Attendance: {percentage}%
              </Typography>
            )}
            {requiredClasses !== null && (
              <Typography variant="body1" align="center" mt={2} color="error">
                Attend {requiredClasses} more classes to reach 75%
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ManualAttendance;
