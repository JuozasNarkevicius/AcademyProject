import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Sport from "./pages/Sport";
import Nutrition from "./pages/Nutrition";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navigation from "./components/Navigation";
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sport" element={<Sport/>}/>
        <Route path="/nutrition" element={<Nutrition/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
