// frontend/src/pages/CompareReportsPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import CompareTestsForm from '../components/services/compare/CompareTestsForm';
import FormContainer from '../components/services/FormContainer';
import CompareResultsDisplay from '../components/services/compare/CompareResultsDisplay';

function CompareReportsPage() {
    const [summary, setSummary] = useState(null);

    const handleResultUpdate = (data) => {
        setSummary(data);
        console.log("Summary updated in CompareReportsPage:", data); // Log the data
    };

    return (
        <div>
            <Link to="/">Back to Dashboard</Link>
            <FormContainer>
                <Typography variant="h6" gutterBottom sx={{ paddingBottom: '20px' }}>Compare Blood Tests</Typography>
                <CompareTestsForm onResult={handleResultUpdate} />
                <CompareResultsDisplay result={summary} />
            </FormContainer>
        </div>
    );
}

export default CompareReportsPage;