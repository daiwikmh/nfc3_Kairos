import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, Button, TextField, Typography, Link } from '@mui/material';

const AdminAuth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        id: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (login or signup)
        console.log(formData);
        navigate("/admin/dashboard");
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
                                label="Admin ID"
                                variant="outlined"
                                fullWidth
                                id="id"
                                name="id"
                                value={formData.id}
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
