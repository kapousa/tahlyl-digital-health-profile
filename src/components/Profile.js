import React, { useContext } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { UserContext } from '../contexts/UserContext'; // Adjust path as needed

function Profile() {
  const { user, loading, error } = useContext(UserContext);

  if (loading) {
    return <Typography>Loading user profile...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error loading profile: {error.message}</Typography>;
  }

  if (!user) {
    return <Typography>Please log in to view your profile.</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>Profile</Typography>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h6">User Information</Typography>
          <Typography>Username: {user.username}</Typography>
          <Typography>Email: {user.email}</Typography>
          {user.phone && <Typography>Phone: {user.phone}</Typography>}
          {/* Add more profile information */}
        </Paper>
      </Box>
    </Container>
  );
}

export default Profile;