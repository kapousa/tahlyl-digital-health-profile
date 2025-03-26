import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography } from '@mui/material';

function ApiServices() {
  const services = [
    { id: 1, name: 'Blood Test Analysis', description: 'Analyzes blood test results and provides a detailed report and suggestions for recovering and enhancing lifestyle.' },
    { id: 2, name: 'Compare Blood Tests', description: 'Compare two blood test reports.', action: 'Compares multiple blood test reports and provides a progress summary.' },,
  ];

  const handleStartService = (action) => {
    // Simulate starting the service (replace with your actual service logic)
    console.log(`Starting service: ${action}`);
    // In a real app, you would use an API or service call here.
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>Available Services</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Service Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell component="th" scope="row">{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStartService(service.action)}
                  >
                    Start
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ApiServices;