import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

function ResultDisplay({ result }) {
    if (!result) return null;

    const isArabic = result.summary && /[\u0600-\u06FF]/.test(result.summary);

    const rtlStyles = {
        direction: 'rtl',
        textAlign: 'right',
    };

    const renderList = (items) => {
        if (!items) return null;
    
        if (Array.isArray(items) && items.length > 0) {
            return (
                <ul style={isArabic ? rtlStyles : undefined}>
                    {items.map((item, index) => {
                        if (typeof item === 'object' && item !== null) {
                            return (
                                <li key={index}>
                                    {Object.entries(item).map(([key, value]) => (
                                        <Typography key={key} paragraph style={isArabic ? rtlStyles : undefined}>
                                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                        </Typography>
                                    ))}
                                </li>
                            );
                        } else {
                            return (
                                <li key={index}>
                <span>{`${index}:${item}`}</span>
            </li>
                            );
                        }
                    })}
                </ul>
            );
        } else if (typeof items === 'object' && items !== null && Object.keys(items).length > 0) {
            return (
                <ul style={isArabic ? rtlStyles : undefined}>
                    {Object.entries(items).map(([key, value]) => {
                        if (Array.isArray(value) && value.length > 0) {
                            return value.map((item, index) => (
                                <li key={`${key}-${index}`}>
                                    <Typography paragraph style={isArabic ? rtlStyles : undefined}>
                                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {item}
                                    </Typography>
                                </li>
                            ));
                        } else {
                            return (
                                <li key={key}>
                                    <Typography paragraph style={isArabic ? rtlStyles : undefined}>
                                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                    </Typography>
                                </li>
                            );
                        }
                    })}
                </ul>
            );
        } else if (typeof items === "string" && items.trim().length > 0) {
            return <Typography paragraph style={isArabic ? rtlStyles : undefined}>{items}</Typography>
        }
        return null;
    };

    const renderResult = (result) => {
        if (typeof result === 'string' && result.trim().length > 0) {
            return <Typography paragraph style={isArabic ? rtlStyles : undefined}>{result}</Typography>;
        } else if (typeof result === 'object' && result !== null && Object.keys(result).length > 0) {
            return (
                <Box>
                    {Object.entries(result).map(([key, value]) => {
                        if(value != null && (typeof value !== "object" || (Array.isArray(value) ? value.length > 0 : Object.keys(value).length > 0))){
                            const itemStyle = isArabic ? rtlStyles : undefined;
                            return (
                                <Box key={key}>
                                    <Typography variant="subtitle1" style={itemStyle}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                                    </Typography>
                                    {renderList(value)}
                                </Box>
                            );
                        } else {
                            return null;
                        }
                    })}
                </Box>
            );
        }
        return null;
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom style={isArabic ? rtlStyles : undefined}>Analysis Results</Typography>
                {Object.entries(result).map(([key, value]) => {
                    if(value != null && (typeof value !== "object" || (Array.isArray(value) ? value.length > 0 : Object.keys(value).length > 0))){
                        const itemStyle = isArabic ? rtlStyles : undefined;
                        return (
                            <Box key={key}>
                                <Typography variant="subtitle1" style={itemStyle}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </Typography>
                                {renderResult(value)}
                            </Box>
                        );
                    } else {
                        return null;
                    }

                })}
            </Paper>
        </Box>
    );
}

export default ResultDisplay;