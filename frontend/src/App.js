import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sport from './pages/Sport';
import Nutrition from './pages/Nutrition';
import Login from './pages/Login';
import Register from './pages/Register';
import Navigation from './components/Navigation';
import './App.css';
import ProgramCreation from './pages/ProgramCreation';

const App = () => (
  <div className="App">
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sport" element={<Sport />} />
      <Route path="/nutrition" element={<Nutrition />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/sport/create" element={<ProgramCreation />} />
    </Routes>
  </div>
);

export default App;
