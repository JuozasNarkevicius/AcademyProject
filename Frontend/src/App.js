import { Routes, Route } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import {
  Home, Sport, Login, Register, ProgramCreation, ProgramView,
} from './pages';
import ROUTES from './constants/Routes';
import './App.css';

const App = () => (
  <div className="App">
    <Navigation />
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.SPORT} element={<Sport />} />
      <Route path={ROUTES.MY_PROGRAMS} element={<ProgramView />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.CREATE_PROGRAM} element={<ProgramCreation />} />
    </Routes>
  </div>
);

export default App;
