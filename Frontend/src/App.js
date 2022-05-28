import { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { StyledEngineProvider } from '@mui/material/styles';
import { initializeApp } from 'firebase/app';
import { SnackbarProvider } from 'notistack';
import firebaseConfig from './constants/firebase';
import Navigation from './components/layout/Navigation';
import {
  Home, Login, Registration,
  ProgramView, SharedPrograms,
  PublicProgramView, Trainers, TrainerProfile,
  TrainerApplication, TrainerApplicationList,
  TrainerApplicationView,
} from './pages';
import ROUTES from './constants/Routes';
import './App.css';
import { AuthorizationContext } from './Context';
import theme from './styles/theme';

initializeApp(firebaseConfig);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('auth'));
  const [role, setRole] = useState(sessionStorage.getItem('role'));

  const LoginInformation = useMemo(() => ({
    isLoggedIn, setIsLoggedIn, role, setRole,
  }), [isLoggedIn, role]);

  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <AuthorizationContext.Provider value={LoginInformation}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
              <Navigation />
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.MY_PROGRAMS} element={<ProgramView />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Registration />} />
                <Route path={ROUTES.BROWSE_PROGRAMS} element={<SharedPrograms />} />
                <Route path={`${ROUTES.PUBLIC_PROGRAM}/:id`} element={<PublicProgramView />} />
                <Route path={ROUTES.TRAINERS} element={<Trainers />} />
                <Route path={`${ROUTES.TRAINER_PROFILE}/:id`} element={<TrainerProfile />} />
                <Route path={ROUTES.TRAINER_APPLICATION} element={<TrainerApplication />} />
                <Route
                  path={ROUTES.TRAINER_APPLICATION_LIST}
                  element={<TrainerApplicationList />}
                />
                <Route path={`${ROUTES.TRAINER_APPLICATION_VIEW}/:id`} element={<TrainerApplicationView />} />
              </Routes>
            </SnackbarProvider>
          </ThemeProvider>
        </AuthorizationContext.Provider>
      </StyledEngineProvider>
    </div>
  );
};

export default App;
