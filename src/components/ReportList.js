import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

function ReportList() {
  const reports = [
    { id: 1, name: 'Lab Report 2024-03-20', date: '2024-03-20', file: 'lab_report_20240320.pdf' },
    { id: 2, name: 'Imaging Report 2024-03-15', date: '2024-03-15', file: 'imaging_report_20240315.pdf' },
    { id: 3, name: 'Genetic Report 2024-03-10', date: '2024-03-10', file: 'genetic_report_20240310.pdf' },
  ];

  const handleDownload = (file) => {
    // Simulate download (replace with your actual download logic)
    console.log(`Downloading ${file}`);
    // In a real app, you would use an API or file download library here.
    // For example: window.open(`/api/download/${file}`, '_blank');
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>Uploaded Reports</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Report Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell component="th" scope="row">{report.name}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleDownload(report.file)}
                  >
                    Download
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

export default ReportList;