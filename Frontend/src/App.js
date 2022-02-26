import { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { StyledEngineProvider } from '@mui/material/styles';
import Navigation from './components/layout/Navigation';
import {
  Sport, Login, Registration,
  ProgramCreation, ProgramView, SharedPrograms,
  PublicProgramView, Trainers, TrainerProfile,
} from './pages';
import ROUTES from './constants/Routes';
import './App.css';
import { AuthorizationContext } from './Context';
import theme from './styles/theme';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('auth'));

  const isLoggedInMemo = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn]);

  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <AuthorizationContext.Provider value={isLoggedInMemo}>
          <ThemeProvider theme={theme}>
            <Navigation />
            <Routes>
              <Route path={ROUTES.SPORT} element={<Sport />} />
              <Route path={ROUTES.MY_PROGRAMS} element={<ProgramView />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.REGISTER} element={<Registration />} />
              <Route path={ROUTES.CREATE_PROGRAM} element={<ProgramCreation />} />
              <Route path={ROUTES.BROWSE_PROGRAMS} element={<SharedPrograms />} />
              <Route path={`${ROUTES.PUBLIC_PROGRAM}/:id`} element={<PublicProgramView />} />
              <Route path={ROUTES.TRAINERS} element={<Trainers />} />
              <Route path={ROUTES.TRAINER_PROFILE} element={<TrainerProfile />} />
            </Routes>
          </ThemeProvider>
        </AuthorizationContext.Provider>
      </StyledEngineProvider>
    </div>
  );
};

export default App;
