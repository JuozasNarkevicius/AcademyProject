import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ROUTES from '../constants/Routes';

const Navigation = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
          Logo
        </Typography>
        <Button color="inherit" component={Link} to={ROUTES.SPORT}>Sport</Button>
        <Button color="inherit" component={Link} to={ROUTES.NUTRITION}>Nutrition</Button>
        <Button color="inherit" component={Link} to={ROUTES.LOGIN}>Login</Button>
        <Button color="inherit" component={Link} to={ROUTES.REGISTER}>Register</Button>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navigation;
