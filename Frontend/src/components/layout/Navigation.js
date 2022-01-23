import React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ROUTES from '../../constants/Routes';

const Navigation = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="relative" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
          Logo
        </Typography>
        <Button color="inherit" component={Link} to={ROUTES.SPORT}>Sport</Button>
        <Button color="inherit" component={Link} to={ROUTES.LOGIN}>Login</Button>
        <Button color="inherit" component={Link} to={ROUTES.REGISTER}>Register</Button>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navigation;
