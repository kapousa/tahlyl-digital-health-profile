import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ApiServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/services/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
        console.error("Could not fetch services:", e);
      }
    };

    fetchServices();
  }, []);

  const handleStartService = (url) => {
    console.log(`Starting service at URL: ${url}`);
    // Use navigate to go to the URL
    navigate(url);
  };

  if (loading) {
    return <Box mt={4}><Typography>Loading services...</Typography></Box>;
  }

  if (error) {
    return <Box mt={4}><Typography color="error">Error loading services: {error}</Typography></Box>;
  }

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>Available Services from API</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow><TableCell style={{ fontWeight: 'bold' }}>Service</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell component="th" scope="row">{service.api_name || service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  {service.url ? ( // Check if service.url exists (is not null or undefined)
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleStartService(service.url)}
                    >
                      Start
                    </Button>
                  ) : (
                    <span style={{ color: 'red' }}>Soon</span>
                  )}
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