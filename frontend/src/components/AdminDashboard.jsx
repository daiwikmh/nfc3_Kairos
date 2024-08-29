import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Button, Grid, Typography, TextField, Box, Alert } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { grey } from '@mui/material/colors';
import useAuthStore from '../store/useAuthStore';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalPolicies: 46,
        activeClaims: 6457,
        revenue: 547,
    });
    const [recentPolicies, setRecentPolicies] = useState([]);
    const [claimedPolicies, setClaimedPolicies] = useState([]);
    const [pendingClaims, setPendingClaims] = useState([]);
    const [userList, setUserList] = useState([]);
    const [policyName, setPolicyName] = useState('');
    const [policyDetails, setPolicyDetails] = useState({ type: '', amount: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const { company } = useAuthStore();

    const handleAddPolicy = () => {
        setRecentPolicies([...recentPolicies, { id: Date.now(), name: policyName, ...policyDetails }]);
        setSuccessMessage('Policy added successfully!');
        setPolicyName('');
        setPolicyDetails({ type: '', amount: '' });
    };

    const handleViewClaimedPolicies = () => {
        // Handle viewing claimed policies
    };

    const handleViewPendingClaims = () => {
        // Handle viewing pending claims
    };

    const handleManageUsers = () => {
        // Handle managing users
    };

    const handleGenerateReports = () => {
        // Handle generating reports
    };

    const data = [
        { name: 'Jan', user: 245, policies: 400, claims: 240 },
        { name: 'Feb', user: 245, policies: 300, claims: 139 },
        { name: 'Mar', user: 245, policies: 200, claims: 980 },
        { name: 'Apr', user: 245, policies: 278, claims: 390 },
        { name: 'May', user: 245, policies: 189, claims: 480 },
    ];

    return (
        <div style={{ padding: '16px', backgroundColor: grey[100] }}>
            <Typography variant="h4" gutterBottom color='black'>
                Admin Dashboard - {company.companyName}
            </Typography>

            {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {successMessage}
                </Alert>
            )}

            <Grid container spacing={4} style={{ marginBottom: '16px' }}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardHeader title="Total Policies" />
                        <CardContent>
                            <Typography variant="h5">{stats.totalPolicies}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardHeader title="Active Claims" />
                        <CardContent>
                            <Typography variant="h5">{stats.activeClaims}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardHeader title="Total Revenue" />
                        <CardContent>
                            <Typography variant="h5">${stats.revenue}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Card style={{ marginBottom: '16px' }}>
                <CardHeader title="Policies and Claims Overview" />
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="user" fill="black" />
                            <Bar dataKey="policies" fill="#8884d8" />
                            <Bar dataKey="claims" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card style={{ marginBottom: '16px' }}>
                <CardHeader title="Add New Policy" />
                <CardContent>
                    <TextField
                        label="Policy Name"
                        variant="outlined"
                        fullWidth
                        value={policyName}
                        onChange={(e) => setPolicyName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Policy Type"
                        variant="outlined"
                        fullWidth
                        value={policyDetails.type}
                        onChange={(e) => setPolicyDetails({ ...policyDetails, type: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Policy Amount"
                        variant="outlined"
                        fullWidth
                        value={policyDetails.amount}
                        onChange={(e) => setPolicyDetails({ ...policyDetails, amount: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleAddPolicy}>
                        Add Policy
                    </Button>
                </CardContent>
            </Card>

            <Card style={{ marginBottom: '16px' }}>
                <CardHeader title="Recent Policies" />
                <CardContent>
                    {recentPolicies.map((policy) => (
                        <Typography key={policy.id} variant="body2" gutterBottom>
                            {policy.name} - {policy.type} - ${policy.amount}
                        </Typography>
                    ))}
                    <Button variant="contained" color="primary" onClick={handleViewClaimedPolicies}>
                        View Claimed Policies
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleViewPendingClaims}>
                        View Pending Claims
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader title="Quick Actions" />
                <CardContent>
                    <Button variant="contained" color="primary" style={{ marginRight: '8px' }} onClick={handleManageUsers}>
                        Manage Users
                    </Button>
                    <Button variant="contained" color="primary" style={{ marginRight: '8px' }} onClick={handleGenerateReports}>
                        Generate Reports
                    </Button>
                </CardContent>
            </Card>


            {/* New Company Profile Section */}
            <Card style={{ marginTop: '16px' }}>
                <CardHeader title="Company Profile" />
                <CardContent>
                    <Typography variant="h6">Company Name: {company.companyName}</Typography>
                    <Typography variant="body1">Email: {company.email}</Typography>
                    <Typography variant="body1">Address: {company.address}</Typography>
                    <Typography variant="body1">Phone: {company.phone}</Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminDashboard;
