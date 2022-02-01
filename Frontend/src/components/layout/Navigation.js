import React, { useContext } from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../../constants/Routes';
import { authenticationService } from '../../services/AuthenticationService';
import { AuthorizationContext } from '../../Context';

const Navigation = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthorizationContext);
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, m: 0 }} color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            Logo
          </Typography>
          {isLoggedIn === 'true' ? (
            <>
              <Button color="inherit" component={Link} to={ROUTES.MY_PROGRAMS}>My programs</Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                sx={{ p: 0 }}
                color="inherit"
                onClick={() => {
                  authenticationService.logoutAPI();
                  sessionStorage.setItem('auth', 'false');
                  setIsLoggedIn(sessionStorage.getItem('auth'));
                  navigate(ROUTES.LOGIN, { replace: true });
                }}
              >
                Logout

              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to={ROUTES.LOGIN}>Login</Button>
              <Button color="inherit" component={Link} to={ROUTES.REGISTER}>Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
