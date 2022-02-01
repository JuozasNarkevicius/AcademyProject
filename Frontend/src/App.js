import { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import Navigation from './components/layout/Navigation';
import {
  Home, Sport, Login, Registration, ProgramCreation, ProgramView,
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
      <AuthorizationContext.Provider value={isLoggedInMemo}>
        <ThemeProvider theme={theme}>
          <Navigation />
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.SPORT} element={<Sport />} />
            <Route path={ROUTES.MY_PROGRAMS} element={<ProgramView />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Registration />} />
            <Route path={ROUTES.CREATE_PROGRAM} element={<ProgramCreation />} />
          </Routes>
        </ThemeProvider>
      </AuthorizationContext.Provider>
    </div>
  );
};

export default App;
