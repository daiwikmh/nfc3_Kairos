import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Button, TextField, MenuItem, Typography, Alert } from '@mui/material';

const ClaimSubmission = () => {
    const [formData, setFormData] = useState({
        policyNumber: '',
        incidentDate: '',
        claimType: '',
        description: '',
        claimAmount: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Simulated API call
        try {
            console.log('Claim submitted:', formData);
            setSuccess('Claim submitted successfully!');
        } catch (err) {
            setError('Failed to submit claim. Please try again.');
        }
    };

    return (
        <Card sx={{ maxWidth: 500, mx: 'auto', mt: 8, p: 2 }}>
            <CardHeader
                title="Submit a Claim"
                titleTypographyProps={{ variant: 'h5', align: 'center', fontWeight: 'bold' }}
            />
            <CardContent>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <TextField
                        name="policyNumber"
                        label="Policy Number"
                        variant="outlined"
                        value={formData.policyNumber}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        type="date"
                        name="incidentDate"
                        label="Date of Incident"
                        variant="outlined"
                        value={formData.incidentDate}
                        onChange={handleChange}
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        select
                        name="claimType"
                        label="Select Claim Type"
                        value={formData.claimType}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        fullWidth
                    >
                        <MenuItem value="medical">Medical</MenuItem>
                        <MenuItem value="property">Property</MenuItem>
                        <MenuItem value="liability">Liability</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </TextField>
                    <TextField
                        name="description"
                        label="Describe the Incident"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        type="number"
                        name="claimAmount"
                        label="Claim Amount"
                        variant="outlined"
                        value={formData.claimAmount}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    {error && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success">
                            {success}
                        </Alert>
                    )}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit Claim
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default ClaimSubmission;
