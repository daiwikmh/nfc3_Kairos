import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Typography, Button, Box, Alert } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAuthStore from '../store/useAuthStore';

const UserDashboard = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [boughtPolicies, setBoughtPolicies] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const { user } = useAuthStore();

    const policiesAvailable = [
        { id: 1, name: 'Health Insurance', premium: '5100', duration: '1 Year' },
        { id: 2, name: 'Car Insurance', premium: '3000', duration: '1 Year' },
        { id: 3, name: 'Bike Insurance', premium: '2000', duration: '1 Year' },
        { id: 4, name: 'Property Insurance', premium: '8000', duration: '5 Years' },
    ];


    const handleBuyPolicy = (policy) => {
        setBoughtPolicies([...boughtPolicies, policy]);
        setSuccessMessage(`${policy.name} purchased successfully!`);
    };

    const handleClaim = (policyToClaim) => {
        setBoughtPolicies(prevPolicies =>
            prevPolicies.map(policy =>
                policy.id === policyToClaim.id ? { ...policy, claimed: true } : policy
            )
        );
        setSuccessMessage(`${policyToClaim.name} has been claimed successfully!`);
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000); // 3 seconds

            return () => clearTimeout(timer); // Clear timeout if the component unmounts or the message changes
        }
    }, [successMessage]);

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return <Overview boughtPolicies={boughtPolicies} />;
            case 'policies':
                return <Policies policiesAvailable={policiesAvailable} boughtPolicies={boughtPolicies} onBuyPolicy={handleBuyPolicy} />;
            case 'claims':
                return <Claims boughtPolicies={boughtPolicies} onClaimPolicy={handleClaim} />;
            case 'profile':
                return <Profile />;
            default:
                return <Overview />;
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome, {user.email}
            </Typography>
            <Box display="flex" mb={4} gap={2}>
                <Button variant="contained" color={activeSection === 'overview' ? 'primary' : 'default'} onClick={() => setActiveSection('overview')}>
                    Overview
                </Button>
                <Button variant="contained" color={activeSection === 'policies' ? 'primary' : 'default'} onClick={() => setActiveSection('policies')}>
                    Policies
                </Button>
                <Button variant="contained" color={activeSection === 'claims' ? 'primary' : 'default'} onClick={() => setActiveSection('claims')}>
                    Claims
                </Button>
                <Button variant="contained" color={activeSection === 'profile' ? 'primary' : 'default'} onClick={() => setActiveSection('profile')}>
                    Profile
                </Button>
            </Box>
            {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {successMessage}
                </Alert>
            )}
            {renderContent()}
        </Box>
    );
};

const Overview = ({ boughtPolicies }) => {
    const totalPremium = boughtPolicies.reduce((total, policy) => total + parseInt(policy.premium), 0);
    const pendingAmount = boughtPolicies.length * 1000; // Example pending amount calculation
    const claimedPolicies = boughtPolicies.filter(policy => policy.claimed);
    const unclaimedPolicies = boughtPolicies.filter(policy => !policy.claimed);

    const data = [
        { name: 'Bought Policies', value: boughtPolicies.length },
        { name: 'Premium Paid', value: totalPremium },
        { name: 'Amount Pending', value: pendingAmount },
        { name: 'Policies Claimed', value: claimedPolicies },
        { name: 'Policies Unclaimed', value: unclaimedPolicies }
    ];

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Dashboard Overview
            </Typography>
            <Box>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
            <Box display="flex" gap={2}>
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h6">Policies Bought</Typography>
                        <Typography variant="h4">{boughtPolicies.length}</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h6">Premium Paid</Typography>
                        <Typography variant="h4">{totalPremium}</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h6">Amount Pending</Typography>
                        <Typography variant="h4">{pendingAmount}</Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box display="flex" gap={2} mt={4}>
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h6">Policies Claimed</Typography>
                        <Typography variant="h4">{claimedPolicies.length}</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography variant="h6">Policies Unclaimed</Typography>
                        <Typography variant="h4">{unclaimedPolicies.length}</Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>

    );
};

const Policies = ({ policiesAvailable, boughtPolicies, onBuyPolicy }) => (
    <Box>
        <Typography variant="h5" gutterBottom>
            Available Policies
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
            {policiesAvailable.map(policy => {
                const isBought = boughtPolicies.some(boughtPolicy => boughtPolicy.id === policy.id);
                return (
                    <Card sx={{ width: 300 }} key={policy.id}>
                        <CardHeader title={policy.name} />
                        <CardContent>
                            <Typography>Premium: {policy.premium}</Typography>
                            <Typography>Duration: {policy.duration}</Typography>
                            <Button
                                variant="contained"
                                color={isBought ? 'success' : 'primary'}
                                disabled={isBought}
                                onClick={() => onBuyPolicy(policy)}
                                fullWidth
                            >
                                {isBought ? 'Bought' : 'Buy'}
                            </Button>
                        </CardContent>
                    </Card>
                );
            })}
        </Box>
    </Box>
);

const Claims = ({ boughtPolicies, onClaimPolicy }) => (
    <Box>
        <Typography variant="h5" gutterBottom>
            Claims
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
            {boughtPolicies.map(policy => (
                <Card sx={{ width: 300 }} key={policy.id}>
                    <CardHeader title={policy.name} />
                    <CardContent>
                        <Typography>Claim Status: {policy.claimed ? 'Claimed' : 'Unclaimed'}</Typography>
                        <Button
                            variant="contained"
                            color={policy.claimed ? 'default' : 'primary'}
                            disabled={policy.claimed}
                            onClick={() => onClaimPolicy(policy)}
                            fullWidth
                        >
                            {policy.claimed ? 'Claimed' : 'Claim Now'}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </Box>
    </Box>
);


const Profile = () => {
    const { user } = useAuthStore();

    // Filter out the password field
    const userDetails = user ? Object.entries(user).filter(([key]) => key !== 'password') : [];

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Profile Management
            </Typography>
            <Card>
                <CardContent>
                    {userDetails.map(([key, value]) => (
                        <Typography key={key} variant="body1">
                            {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                        </Typography>
                    ))}
                    <Button variant="contained" sx={{ mt: 2 }}>Edit Profile</Button>
                </CardContent>
            </Card>
        </Box>
    );
};


export default UserDashboard;
