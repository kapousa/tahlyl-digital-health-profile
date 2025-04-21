// frontend/src/components/CompareResultsDisplay.js
import React from 'react';
import { Typography, Paper } from '@mui/material';

function CompareResultsDisplay({ result, error }) {
    if (error) {
        return (
            <Paper elevation={3} style={{ padding: '10px', marginTop: '20px' }}>
                <Typography color="error">{error}</Typography>
            </Paper>
        );
    }

    if (!result || !result.summary) {
        return (
            <Paper elevation={3} style={{ padding: '10px', marginTop: '20px' }}>
                <Typography>No report yet.</Typography>
            </Paper>
        );
    }

    const summaryText = result.summary;
    const summaryHTML = result.summary; // Now it's HTML
    const isArabic = summaryText && /[\u0600-\u06FF]/.test(summaryText);

    const rtlStyles = {
        direction: 'rtl',
        textAlign: 'right',
    };

    return (
        <Paper elevation={3} style={{ padding: '10px', marginTop: '20px' }}>
            <Typography variant="h6" style={isArabic ? rtlStyles : {}}>Comparison Summary:</Typography>
            <Typography
                style={isArabic ? rtlStyles : {}}
                dangerouslySetInnerHTML={{ __html: summaryHTML }}
            />
        </Paper>
    );
}

export default CompareResultsDisplay;