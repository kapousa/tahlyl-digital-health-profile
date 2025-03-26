import React from 'react';
import { Paper, Typography, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

function HealthChart() {
  // Simulated health data with time series
  const healthData = [
    { time: '2024-01-01', sugar: 100, alt: 40, vitaminD: 20, cholesterol: 180 },
    { time: '2024-01-15', sugar: 110, alt: 45, vitaminD: 25, cholesterol: 190 },
    { time: '2024-02-01', sugar: 120, alt: 50, vitaminD: 22, cholesterol: 200 },
    { time: '2024-02-15', sugar: 115, alt: 48, vitaminD: 28, cholesterol: 195 },
    { time: '2024-03-01', sugar: 105, alt: 42, vitaminD: 26, cholesterol: 185 },
  ];

  // Simulated statistics
  const statistics = [
    { name: 'Average Sugar Level', value: 110, unit: 'mg/dL' },
    { name: 'Average ALT', value: 45, unit: 'U/L' },
    { name: 'Average Vitamin D', value: 24.2, unit: 'ng/mL' },
    { name: 'Average Cholesterol', value: 190, unit: 'mg/dL' },
  ];

  // Simulated detailed info table
  const detailedInfo = [
    { name: 'Last Checkup', value: '2024-03-01' },
    { name: 'Weight', value: '70 kg' },
    { name: 'Height', value: '175 cm' },
    { name: 'Blood Type', value: 'A+' },
    { name: 'BMI', value: '22.9' },
  ];

  // Simulated cholesterol distribution
  const cholesterolData = [
    { name: 'Normal', value: 60 },
    { name: 'Borderline', value: 30 },
    { name: 'High', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>Health Dashboard</Typography>
      <Paper elevation={3} style={{ padding: 16 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography variant="subtitle1">Sugar Level Trend</Typography>
                <LineChart width={250} height={200} data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sugar" stroke="#8884d8" name="Sugar (mg/dL)" />
                </LineChart>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="subtitle1">Liver Enzymes (ALT) Trend</Typography>
                <LineChart width={250} height={200} data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="alt" stroke="#82ca9d" name="ALT (U/L)" />
                </LineChart>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="subtitle1">Vitamin D Trend</Typography>
                <LineChart width={250} height={200} data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="vitaminD" stroke="#ffc658" name="Vitamin D (ng/mL)" />
                </LineChart>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="subtitle1">Cholesterol Trend</Typography>
                <LineChart width={250} height={200} data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="cholesterol" stroke="#FF8042" name="Cholesterol (mg/dL)" />
                </LineChart>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Cholesterol Distribution</Typography>
            <PieChart width={300} height={200}>
              <Pie data={cholesterolData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {cholesterolData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Statistics</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {statistics.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell component="th" scope="row">{item.name}</TableCell>
                      <TableCell align="right">{item.value} {item.unit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Patient Information</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {detailedInfo.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell component="th" scope="row">{item.name}</TableCell>
                      <TableCell align="right">{item.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default HealthChart;