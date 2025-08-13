import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';

const Home: React.FC = () => {

    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // Navigation menu items data
    const navigationItems = [
        {
            id: 1,
            title: "Resultados",
            icon: "https://c.animaapp.com/DhO0cdaV/img/grafico-de-barras-1@2x.png",
            hasArrow: true,
        },
        {
            id: 2,
            title: "Sistematizaciones",
            icon: "https://c.animaapp.com/DhO0cdaV/img/doc-3@2x.png",
            hasArrow: true,
        },
        {
            id: 3,
            title: "Actas",
            icon: "https://c.animaapp.com/DhO0cdaV/img/doc-3@2x.png",
            hasArrow: true,
        },
        {
            id: 4,
            title: "Anexo Técnico",
            icon: "https://c.animaapp.com/DhO0cdaV/img/adjunto--1--1@2x.png",
            hasArrow: true,
        },
        {
            id: 5,
            title: "Planes de Sesion",
            icon: "https://c.animaapp.com/DhO0cdaV/img/portapapeles--1--1@2x.png",
            hasArrow: true,
        },
        {
            id: 6,
            title: "Informes Eventos",
            icon: "https://c.animaapp.com/DhO0cdaV/img/doc-3@2x.png",
            hasArrow: true,
        },
    ];

    // Dashboard cards data
    const dashboardCards = [
        {
            id: 1,
            title: "Observaciones",
        },
        {
            id: 2,
            title: "Planes En Progreso",
        },
        {
            id: 3,
            title: "Actividades Desarrolladas",
        },
    ];

    // Chart cards data
    const chartCards = [
        {
            id: 1,
            title: "Cantidad de Personas",
        },
        {
            id: 2,
            title: "Cantidad de Personas",
        },
        {
            id: 3,
            title: "Cantidad de Personas",
        },
    ];

    {/*useEffect(() => {
        axios.get("http://localhost/PIC/users/check", { withCredentials: true })
            .then(res => {
                if (res.data.authenticated) {
                    setUser(res.data.user);
                } else {
                    window.location.href = "http://localhost/PIC/users/logout";
                }
            });
    }, []);

    if (!user) return <p>Cargando...</p>;*/}
    return (
        <div className="min-h-screen bg-white">
            {        /* Navbar Component */}
            <Navbar />
        </div>
    );
};

export default Home;