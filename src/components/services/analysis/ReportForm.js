import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, CircularProgress, Select, MenuItem, Grid, Box } from '@mui/material';
import axios from 'axios';
import config from '../../../config'; // Assuming your config file path
import FormContainer from './FormContainer'; // Assuming you have a FormContainer component

function ReportForm({ onResult }) {
  const [pdfFile, setPdfFile] = useState(null);
  const [reportType, setReportType] = useState('general');
  const [isArabic, setIsArabic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tone, setTone] = useState('General');
  const [unknownReportType, setUnknownReportType] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null); // Get token from local storage

  const reportTypeOptions = [
    { value: 'general', label: 'General Report' },
    { value: 'cbc', label: 'Complete Blood Count (CBC)' },
    { value: 'compare', label: 'Compare Blood Tests' },
    { value: 'glucose', label: 'Blood Glucose Test' },
    { value: 'liver', label: 'Liver Function Tests (LFTs)' },
    { value: 'kidney', label: 'Kidney Function Tests' },
    { value: 'lipid', label: 'Lipid Profile (Cholesterol Test)' },
    { value: 'hba1c', label: 'Hemoglobin A1c (HbA1c)' },
    { value: 'vitamin_d', label: 'Vitamin D Test' },
    { value: 'thyroid', label: 'Thyroid Function Tests' },
    { value: 'iron', label: 'Iron Studies' },
    { value: 'inflammation', label: 'Inflammation Markers' },
  ];

  const handleChangeTone = (event) => {
    setTone(event.target.value);
  };

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
    setUnknownReportType(false);
  };

  const handleArabicChange = (event) => {
    setIsArabic(event.target.checked);
  };

  const handleUnknownReportTypeChange = (event) => {
    setUnknownReportType(event.target.checked);
    setReportType('');
  };

  const handleSubmit = async () => {
    if (!pdfFile) {
      setError('Please select a PDF file.');
      return;
    }

    if (!unknownReportType && !reportType) {
      setError('Please select a report type or check "I don\'t know my report type".');
      return;
    }

    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('pdf_file', pdfFile);
    formData.append('arabic', isArabic);
    formData.append('tone', tone);
    if (!unknownReportType) {
      formData.append('report_type', reportType);
    } else {
      formData.append('report_type', 'unknown');
    }

    try {
      const response = await axios.post(config.FULL_ANALYSIS, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      onResult(response.data);
    } catch (err) {
      setError('Failed to analyze report.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Typography variant="h6" gutterBottom sx={{ paddingBottom: '20px' }}>Blood Test Analysis</Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h8" gutterBottom>Upload Blood Test Report:</Typography>
        <TextField
          type="file"
          fullWidth
          margin="normal"
          onChange={handleFileChange}
          inputProps={{ accept: 'application/pdf' }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h8" gutterBottom>Select Report Type:</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Select
              label="Select Report Type"
              value={reportType}
              onChange={handleReportTypeChange}
              fullWidth
              margin="normal"
              disabled={unknownReportType}
            >
              {reportTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={unknownReportType}
                  onChange={handleUnknownReportTypeChange}
                  name="unknownReportType"
                />
              }
              label="I don't know"
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h8" gutterBottom>Select Report Tone:</Typography>
        <Select
          label="Select Tone"
          value={tone}
          onChange={handleChangeTone}
          fullWidth
          margin="normal"
        >
          <MenuItem value="General">General</MenuItem>
          <MenuItem value="Doctor">Doctor</MenuItem>
          <MenuItem value="Executive">Executive</MenuItem>
          <MenuItem value="Educational">Educational</MenuItem>
          <MenuItem value="Preventative">Preventative</MenuItem>
          <MenuItem value="Technical">Technical</MenuItem>
          <MenuItem value="Empathetic">Empathetic</MenuItem>
        </Select>
      </Box>
      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={<Checkbox checked={isArabic} onChange={(e) => setIsArabic(e.target.checked)} />}
          label="Get Report in Arabic"
          sx={{ display: 'block' }}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading} sx={{ marginTop: '20px' }}>
        {loading ? <CircularProgress size={24} /> : 'Submit'}
      </Button>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </FormContainer>
  );
}

export default ReportForm;