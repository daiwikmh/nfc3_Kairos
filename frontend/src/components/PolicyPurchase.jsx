import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const PolicyPurchase = () => {
    const [formData, setFormData] = useState({
        policyType: '',
        coverage: '',
        startDate: '',
        duration: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Here you would make an API call to your backend
        try {
            // const response = await api.purchasePolicy(formData);
            // if (response.success) {
            //   setSuccess('Policy purchased successfully!');
            // }
            console.log('Policy purchase request:', formData);
            setSuccess('Policy purchased successfully!'); // Remove this line when you implement actual API call
            setOpenSnackbar(true);
        } catch (err) {
            setError('Failed to purchase policy. Please try again.');
            setOpenSnackbar(true);
        }
    };

    return (
        <Card sx={{ maxWidth: 600, mx: 'auto', mt: 8 }}>
            <CardHeader>
                <Typography variant="h5" component="div" textAlign="center">
                    Purchase a Policy
                </Typography>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} noValidate>
                    <FormControl fullWidth margin="normal">
                        <Select
                            name="policyType"
                            value={formData.policyType}
                            onChange={handleChange}
                            displayEmpty
                            required
                        >
                            <MenuItem value="" disabled>Select policy type</MenuItem>
                            <MenuItem value="life">Life Insurance</MenuItem>
                            <MenuItem value="health">Health Insurance</MenuItem>
                            <MenuItem value="auto">Auto Insurance</MenuItem>
                            <MenuItem value="property">Property Insurance</MenuItem>
                        </Select>
                        <FormHelperText>Select policy type</FormHelperText>
                    </FormControl>

                    <TextField
                        name="coverage"
                        type="number"
                        label="Coverage Amount"
                        value={formData.coverage}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        name="startDate"
                        type="date"
                        label="Policy Start Date"
                        value={formData.startDate}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <FormControl fullWidth margin="normal">
                        <Select
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            displayEmpty
                            required
                        >
                            <MenuItem value="" disabled>Select policy duration</MenuItem>
                            <MenuItem value="1year">1 Year</MenuItem>
                            <MenuItem value="2years">2 Years</MenuItem>
                            <MenuItem value="5years">5 Years</MenuItem>
                            <MenuItem value="10years">10 Years</MenuItem>
                        </Select>
                        <FormHelperText>Select policy duration</FormHelperText>
                    </FormControl>

                    {error && (
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                            <Alert onClose={() => setOpenSnackbar(false)} severity="error">
                                {error}
                            </Alert>
                        </Snackbar>
                    )}
                    {success && (
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                            <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                                {success}
                            </Alert>
                        </Snackbar>
                    )}

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Purchase Policy
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default PolicyPurchase;
