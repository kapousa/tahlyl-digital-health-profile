import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, CircularProgress, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import config from '../../../config';
import FormContainer from './FormContainer';

function UploadForm({ onResult }) {
    const [file, setFile] = useState(null);
    const [arabic, setArabic] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [tone, setTone] = useState('General'); // Default tone

    const handleChangeTone = (event) => {
        setTone(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
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
        if (!file) {
            setError('Please select a PDF file.');
            return;
        }

        if (!validateEmail(email)) {
            return;
        }

        setError(null);
        setLoading(true);

        const formData = new FormData();
        formData.append('pdf_file', file);
        formData.append('arabic', arabic);
        formData.append('email', email);
        formData.append('tone', tone);

        try {
            const response = await axios.post(config.FULL_ANALYSIS, formData, { // Use config.apiUrl
                headers: { 'Content-Type': 'multipart/form-data' },
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
            <Typography variant="h8" gutterBottom>Upload Blood Test Report:</Typography>
            <TextField
                type="file"
                fullWidth
                margin="normal"
                onChange={handleFileChange}
                inputProps={{ accept: 'application/pdf' }}
            />
            <Typography variant="h8" gutterBottom sx={{ paddingBottom: '20px' }}>Select Report Tone:</Typography>
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
                {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
        </FormContainer>
    );
}

export default UploadForm;