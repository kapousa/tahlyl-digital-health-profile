// frontend/src/components/FormContainer.js
import React from 'react';
import { Paper, Box } from '@mui/material';

function FormContainer({ children }) {
    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <Paper elevation={3} sx={{ padding: 2 }}>
                {children}
            </Paper>
        </Box>
    );
}

export default FormContainer;