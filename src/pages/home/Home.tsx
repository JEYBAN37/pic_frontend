import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { getVerifyUser } from './logic/get';
import type {  User } from './data/data';
import { Outlet } from 'react-router-dom';

const Home: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    useEffect(() => {
        const fetchUser = async () => {
            setUser(await getVerifyUser());
        };
        fetchUser();
    }, []);

    if (!user) return <p>No Estas Logueado...</p>;
    return (
        <div className="min-h-[calc(100vh-65px)] mt-16 bg-white">
            {/* Navbar Component */}
            <Navbar grupo={user.group_id} />
            {/* Main Content */}
            <div className="flex h-full">
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
                <main className="flex-1  p-4 md:p-6 lg:p-8 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Home;