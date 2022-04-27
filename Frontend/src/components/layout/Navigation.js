import React, { useContext } from 'react';
import {
  AppBar, Box, Toolbar, Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import ROUTES from '../../constants/Routes';
import authenticationService from '../../services/AuthenticationService';
import { AuthorizationContext } from '../../Context';
import COLORS from '../../styles/colors';
import logo from '../../assets/images/logo.png';

const NavButton = styled(Button)({
  minWidth: '6vw',
});

const Navigation = () => {
  const { isLoggedIn, setIsLoggedIn, role } = useContext(AuthorizationContext);
  const navigate = useNavigate();
  return (
    <Box>
      <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, m: 0, backgroundColor: COLORS.HEADER }} color="primary">
        <Toolbar>
          {isLoggedIn === 'true' ? (
            <>
              <NavButton color="inherit" component={Link} to={ROUTES.HOME}><img src={logo} alt="" style={{ height: '2rem' }} /></NavButton>
              <NavButton color="inherit" component={Link} to={ROUTES.MY_PROGRAMS}>My programs</NavButton>
              <NavButton color="inherit" component={Link} to={ROUTES.BROWSE_PROGRAMS}>Browse programs</NavButton>
              <NavButton color="inherit" component={Link} to={ROUTES.TRAINERS}>Trainers</NavButton>
              <NavButton color="inherit" component={Link} to={ROUTES.TRAINER_APPLICATION}>Become a trainer</NavButton>
              {role === 'admin'
              && <NavButton color="inherit" component={Link} to={ROUTES.TRAINER_APPLICATION_LIST}>Trainer applications</NavButton>}
              <Box sx={{ flexGrow: 1 }} />
              <NavButton
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

              </NavButton>
            </>
          ) : (
            <>
              <Box>
                <Button color="inherit" component={Link} to={ROUTES.HOME}><img src={logo} alt="" style={{ height: '2rem' }} /></Button>
              </Box>
              <Box>
                <NavButton color="inherit" component={Link} to={ROUTES.LOGIN}>Login</NavButton>
                <NavButton
                  color="inherit"
                  component={Link}
                  to={ROUTES.REGISTER}
                  sx={{
                    backgroundColor: COLORS.SECONDARY,
                    '&:hover': { backgroundColor: COLORS.SECONDARY_HOVER },
                  }}
                >
                  Register
                </NavButton>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
