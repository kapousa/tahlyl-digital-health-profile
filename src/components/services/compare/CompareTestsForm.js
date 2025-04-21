// frontend/src/components/CompareTestsForm.js
import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, CircularProgress, List, ListItem, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import config from '../../../config';
import FormContainer from '../../services/FormContainer';
import axios from 'axios';

function CompareTestsForm({ onResult }) {
    const [files, setFiles] = useState([]);
    const [arabic, setArabic] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');

    const handleFileChange = (event) => {
        setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        validateEmail(event.target.value);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            setEmailHelperText('Enter a valid email address');
            return false;
        } else {
            setEmailError(false);
            setEmailHelperText('');
            return true;
        }
    };

    const handleSubmit = async () => {
        if (files.length === 0) {
            setError('Please select at least one PDF file.');
            return;
        }

        if (!validateEmail(email)) {
            return;
        }

        setError(null);
        setLoading(true);

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        formData.append('arabic', arabic);
        formData.append('email', email);

        try {
            const response = await axios.post(config.COMPARE_ANALYSIS, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            // Check for successful HTTP status codes (2xx)
            if (response.status >= 200 && response.status < 300) {
                // Extract the 'summary' from the response data
                const summary = response.data.summary;
                onResult({ summary }); // Pass the summary to onResult
            } else {
                setError(`Server responded with status: ${response.status}`);
                console.error("Server response:", response);
            }
        } catch (err) {
            setError('Failed to compare reports.');
            console.error("Axios error:", err);
        } finally {
            setLoading(false);
        }
    };
    
    const clearFiles = () => {
        setFiles([]);
    };

    return (
        <FormContainer>
            <Typography variant="h8" gutterBottom>Upload Blood Test Reports:</Typography>
            <input
                type="file"
                multiple
                accept="application/pdf"
                onChange={handleFileChange}
            />
            {files.length > 0 && (
                <div>
                    <Typography variant="body2">Selected Files:</Typography>
                    <List>
                        {files.map((file, index) => (
                            <ListItem key={index} secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => setFiles(prevFiles => {
                                    const newFiles = [...prevFiles];
                                    newFiles.splice(index, 1);
                                    return newFiles;
                                })}>
                                    <DeleteIcon />
                                </IconButton>
                            }>
                                {file.name}
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={clearFiles}>Clear Files</Button>
                </div>
            )}
            <FormControlLabel
                control={<Checkbox checked={arabic} onChange={(e) => setArabic(e.target.checked)} />}
                label="Get Report in Arabic"
            />
            <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailHelperText}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Compare'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
        </FormContainer>
    );
}

export default CompareTestsForm;