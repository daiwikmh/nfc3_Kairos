import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const UserAuth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        age: '',
        dob: '',
        gender: ''
    });
    const navigate = useNavigate(); // Initialize the navigate function

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (login or signup)
        console.log(formData);
        navigate('/user/dashboard'); // Navigate to /user/dashboard
    };

    return (
        <Card sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
            <CardHeader title={isLogin ? 'User Login' : 'User Signup'} />
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            fullWidth
                        />
                        {!isLogin && (
                            <>
                                <TextField
                                    label="Age"
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label="Date of Birth"
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                    required
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                />
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    row
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </>
                        )}
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Button>
                    </div>
                </form>
                <p style={{ marginTop: '16px', textAlign: 'center' }}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <Button
                        variant="text"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </Button>
                </p>
            </CardContent>
        </Card>
    );
};

export default UserAuth;
