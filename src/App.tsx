import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import './App.css'
import Login from "./pages/login/Login";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homePage" element={<Home />} />
        </Routes>
      </Router>
  )
}

export default App
