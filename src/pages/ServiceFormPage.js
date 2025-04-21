import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReportForm from '../components/services/analysis/ReportForm'; // Import the new form
import ResultDisplay from '../components/services/analysis/ResultDisplay';

function ServiceFormPage() {
  const [result, setResult] = useState(null);

  const handleAnalysisResult = (analysisResult) => {
    setResult(analysisResult);
  };

  return (
    <div>
      <Link to="/">Back to Home</Link>
      <ReportForm onResult={handleAnalysisResult} /> {/* Use the new ReportForm */}
      <ResultDisplay result={result} />
    </div>
  );
}

export default ServiceFormPage;