/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import {
  Home, Sport, Login, Registration, ProgramCreation, ProgramView,
} from './pages';
import ROUTES from './constants/Routes';
import './App.css';
import { AuthorizationContext } from './Context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  return (
    <div className="App">
      <AuthorizationContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Navigation />
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SPORT} element={<Sport />} />
          <Route path={ROUTES.MY_PROGRAMS} element={<ProgramView />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Registration />} />
          <Route path={ROUTES.CREATE_PROGRAM} element={<ProgramCreation />} />
        </Routes>
      </AuthorizationContext.Provider>
    </div>
  );
};

export default App;
