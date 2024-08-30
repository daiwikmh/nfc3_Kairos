import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

const Home = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="grey.900"
            width="100vw"
        >
            <Typography variant="h2" component="h1" gutterBottom>
                Welcome to Insurance Blockchain System
            </Typography>
            <Box mt={4}>
                <Box mb={4}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        For Users
                    </Typography>
                    <Link to="/user/login" style={{ textDecoration: 'none', marginRight: '8px' }}>
                        <Button variant="contained" color="primary">
                            Login
                        </Button>
                    </Link>
                </Box>
                <Box>
                    <Typography variant="h5" component="h2" gutterBottom>
                        For Admins
                    </Typography>
                    <Link to="/admin/login" style={{ textDecoration: 'none', marginRight: '8px' }}>
                        <Button variant="contained" color="secondary">
                            Login
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
