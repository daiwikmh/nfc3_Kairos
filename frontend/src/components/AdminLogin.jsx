import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, Button, TextField, Typography, Link } from '@mui/material';
import useAuthStore from '../store/useAuthStore';

const AdminAuth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        companyName: '', // Changed from id to companyName
        email: '',
        password: ''
    });
    const {setCompanyLogin} = useAuthStore();

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isLogin ? '/api/admin/login' : '/api/admin/signup';
            const response = await fetch(`http://localhost:5001${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                throw new Error(errorData.message || 'Something went wrong');
            }

            const data = await response.json();
            // Save the token in localStorage or context
            localStorage.setItem('token', data.token);
            localStorage.setItem('admin', JSON.stringify(data.admin));
            setCompanyLogin(data.admin)
            navigate('/admin/dashboard'); // Navigate to the admin dashboard after login/signup
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <Card sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
            <CardHeader
                title={isLogin ? 'Admin Login' : 'Admin Signup'}
                titleTypographyProps={{ variant: 'h5', align: 'center' }}
            />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        {!isLogin && (
                            <TextField
                                label="Company Name"
                                variant="outlined"
                                fullWidth
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                required
                                margin="normal"
                            />
                        )}
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            margin="normal"
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </Button>
                </form>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <Link component="button" variant="body2" onClick={() => setIsLogin(!isLogin)} sx={{ ml: 1 }}>
                        {isLogin ? 'Sign Up' : 'Login'}
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AdminAuth;
