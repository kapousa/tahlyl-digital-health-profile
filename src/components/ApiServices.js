import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography } from '@mui/material';

function ApiServices() {
  const services = [
    {
      id: 1,
      name: 'Blood Test Analysis',
      description: 'Analyzes blood test results and provides a detailed report and suggestions for recovering and enhancing lifestyle.',
      reportOutput: 'Patient',
      keyAICapabilities: 'Biomarker analysis, health risk assessment, lifestyle recommendation generation.',
    },
    {
      id: 2,
      name: 'Compare Blood Tests',
      description: 'Compares multiple blood test reports and provides a progress summary.',
      reportOutput: 'Patient/Doctor',
      keyAICapabilities: 'Time-series analysis, data visualization, progress tracking algorithms.',
    },
    {
      id: 3,
      name: 'Biomarker Trend Analysis API',
      description: 'Analyzes time-series blood test data, identifying trends and patterns in biomarker levels.',
      reportOutput: 'Patient/Doctor',
      keyAICapabilities: 'Time-series analysis, anomaly detection, predictive modeling.',
    },
    {
      id: 4,
      name: 'Nutritional Deficiency & Dietary Recommendations API',
      description: 'Evaluates blood micronutrient levels, identifying deficiencies and providing personalized dietary recommendations.',
      reportOutput: 'Patient/Pharmacist',
      keyAICapabilities: 'Knowledge graph integration (nutrients, foods), natural language generation (dietary advice).',
    },
    {
      id: 5,
      name: 'Disease Risk Assessment API',
      description: 'Calculates risk scores for specific diseases based on biomarker patterns.',
      reportOutput: 'Patient/Doctor',
      keyAICapabilities: 'Machine learning classification, risk prediction models, explainable AI for risk factor identification.',
    },
    {
      id: 6,
      name: 'Drug Interaction & Metabolic Impact API',
      description: 'Analyzes blood test results in conjunction with medication data, identifying potential drug interactions and metabolic impacts.',
      reportOutput: 'Pharmacist/Doctor',
      keyAICapabilities: 'Knowledge graph integration (drugs, metabolic pathways), drug interaction prediction models.',
    },
    {
      id: 7,
      name: 'Personalized Wellness & Lifestyle API',
      description: 'Provides personalized wellness recommendations based on biomarker profiles and lifestyle data.',
      reportOutput: 'Patient',
      keyAICapabilities: 'Clustering algorithms (patient profiling), reinforcement learning (personalized recommendations).',
    },
    {
      id: 8,
      name: 'Cognitive Health Assessment API',
      description: 'Analyzes biomarkers related to cognitive function, providing insights into potential cognitive decline.',
      reportOutput: 'Patient',
      keyAICapabilities: 'Biomarker correlation analysis, cognitive health risk models.',
    },
    {
      id: 9,
      name: 'Inflammatory Marker Analysis API',
      description: 'Focuses on the analysis of inflammatory markers in the blood, identifying potential chronic inflammation.',
      reportOutput: 'Patient/Doctor',
      keyAICapabilities: 'Time-series analysis of inflammatory markers, correlation with lifestyle factors.',
    },
    {
      id: 10,
      name: 'Hormonal Balance API',
      description: 'Analyzes hormone levels, providing insights into hormonal imbalances and related health conditions.',
      reportOutput: 'Patient/Doctor',
      keyAICapabilities: 'Hormone level correlation analysis, identification of hormonal imbalance patterns.',
    },
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
              <TableCell>Beneficiary Focus</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell component="th" scope="row">{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>{service.reportOutput}</TableCell>
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