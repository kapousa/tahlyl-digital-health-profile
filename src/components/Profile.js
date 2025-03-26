import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

function Profile() {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>Profile</Typography>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h6">User Information</Typography>
          <Typography>Username: John Doe</Typography>
          <Typography>Email: john.doe@example.com</Typography>
          <Typography>Phone: 123-456-7890</Typography>
          {/* Add more profile information and editing options here */}
        </Paper>
      </Box>
    </Container>
  );
}

export default Profile;