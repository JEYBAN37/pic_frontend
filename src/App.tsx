import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home/Home';
import './App.css'
import Login from "./pages/login/Login";
import Dashboard from "./pages/home/components/Dashboard";
import UserAdmin from "./pages/home/components/UserAdmin";


function App() {

  return (
    <Router>
      <Routes>
        {/* Ruta Login */}
        <Route path="/" element={<Login />} />

        {/* Layout protegido */}
        <Route path="/homePage" element={<Home />}>
          {/* Redirigir a dashboard como vista inicial */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Ruta dashboard */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="userAdmin" element={<UserAdmin />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
