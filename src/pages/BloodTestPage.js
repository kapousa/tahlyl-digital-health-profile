import React from 'react';
import { Link } from 'react-router-dom';
import UploadForm from '../components/services/analysis/UploadForm';
import ResultDisplay from '../components/services/analysis/ResultDisplay';

function BloodTestPage() {
    const [result, setResult] = React.useState(null);

    return (
        <div>
            <Link to="/">Back to Home</Link>
            <UploadForm onResult={setResult} />
            <ResultDisplay result={result} />
        </div>
    );
}

export default BloodTestPage;