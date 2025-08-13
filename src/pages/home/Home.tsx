import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { u } from 'framer-motion/client';

const Home: React.FC = () => {

    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


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

    useEffect(() => {
        axios.get("http://localhost/PIC/users/check", { withCredentials: true })
            .then(res => {
                if (res.data.authenticated) {
                    setUser(res.data.user);
                } else {
                    window.location.href = "http://localhost/PIC/users/logout";
                }
            });

        const userInfo = localStorage.getItem('infoUser');
        if (userInfo) {
            console.log("User info from localStorage:", userInfo);
            setUser(JSON.parse(userInfo));
        }
    }, []);

    if (!user) return <p>Cargando...</p>;
    return (
        <div className="min-h-[calc(100vh-65px)] mt-16 bg-white">
            {/* Navbar Component */}
            <Navbar />
            {/* Main Content */}
            <div className="flex">
                {/* Sidebar */}
                <Sidebar nombre={user.nombre} rol={"Administrador"} />
                {/* Mobile Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="font-bold text-[#155dfc] text-2xl md:text-3xl lg:text-4xl  mb-2">
                            Resultados
                        </h1>
                        <div className="font-semibold text-gray-600 text-sm md:text-[15px] ">
                            Conoce a Detalle como va el Proceso de Implementación del PIC 2025
                        </div>
                    </div>

                    {/* Dashboard Cards Grid */}
                    <div className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dashboardCards.map((card) => (
                                <div key={card.id} className="space-y-4 ">

                                    <div className="w-full h-[200px] rounded-2xl border bg-white border-neutral-400 relative overflow-hidden">
                                        <h3 className="font-semibold text-black text-xl pl-6 py-4">
                                            {card.title}
                                        </h3>
                                        <img
                                            className="absolute top-2.5 right-4 w-[173px] h-44 object-cover"
                                            alt="Chart visualization"
                                            src="https://c.animaapp.com/DhO0cdaV/img/image-37@2x.png"
                                        />
                                        <img
                                            className="absolute top-[18px] left-[29px] w-[109px] h-[161px] object-cover"
                                            alt="Chart data"
                                            src="https://c.animaapp.com/DhO0cdaV/img/image-38@2x.png"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chart Cards Grid */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {chartCards.map((card) => (
                                <div key={card.id} className="space-y-4">
                                    <div className="w-full h-[200px] rounded-2xl border bg-white border-neutral-400 relative overflow-hidden">
                                        <h3 className="font-semibold text-black text-xl pl-6 py-4">
                                            {card.title}
                                        </h3>
                                        <img
                                            className="absolute top-[9px] left-[17px] w-full max-w-[304px] h-[170px] object-cover"
                                            alt="Bar chart"
                                            src="https://c.animaapp.com/DhO0cdaV/img/image-41@2x.png"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;