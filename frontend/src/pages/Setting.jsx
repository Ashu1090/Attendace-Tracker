import { useState } from "react";
import { Card, CardContent, CardHeader, TextField, MenuItem, Button, Avatar, IconButton, Snackbar, Alert } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Ashiq",
    age: 20,
    gender: "Male",
    qualifications: "B.Sc Computer Science",
    profilePic: "https://via.placeholder.com/150"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile({ ...profile, profilePic: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setOpenSnackbar(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '16px' }}>
      <Card style={{ maxWidth: 400, width: '100%', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <CardHeader title="Profile Settings" style={{ textAlign: 'center', backgroundColor: '#3f51b5', color: 'white' }} />
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <Avatar src={profile.profilePic} alt="Profile Picture" style={{ width: 100, height: 100 }} />
              <input accept="image/*" type="file" style={{ display: 'none' }} id="upload-photo" onChange={handleProfilePicChange} />
              <label htmlFor="upload-photo">
                <IconButton color="primary" component="span" style={{ position: 'absolute', bottom: 0, right: 0 }}>
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
            <TextField fullWidth label="Name" name="name" value={profile.name} onChange={handleChange} variant="outlined" disabled={!isEditing} />
            <TextField fullWidth label="Age" name="age" value={profile.age} onChange={handleChange} type="number" variant="outlined" disabled={!isEditing} />
            <TextField
              select
              fullWidth
              label="Gender"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              variant="outlined"
              disabled={!isEditing}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField fullWidth label="Qualifications" name="qualifications" value={profile.qualifications} onChange={handleChange} variant="outlined" disabled={!isEditing} />
            {isEditing ? (
              <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
                Save Changes
              </Button>
            ) : (
              <Button variant="outlined" color="primary" fullWidth onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled">
          Saved Successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Settings;
