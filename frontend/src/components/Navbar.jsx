import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Navbar = () => {
    const { isLoggedIn, setUserLogout, isCompanyLoggedIn, setCompanyLogout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (isLoggedIn) {
            setUserLogout();
        }
        if (isCompanyLoggedIn) {
            setCompanyLogout();
        }

        navigate('/');
    };

    const handleNavigateHome = () => {
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    onClick={handleNavigateHome}
                >
                    Insurity
                </Typography>

                {(isLoggedIn || isCompanyLoggedIn) && (
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>



                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
