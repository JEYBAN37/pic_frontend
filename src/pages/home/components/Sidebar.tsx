import React, { useState } from 'react';
import { SidebarData } from '../data/data';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    nombre: string;
    rol: string;
}

const Sidebar: React.FC<SidebarProps> = ({ nombre, rol }) => {
    const [isSidebarOpen] = useState(false);
    const [nombreUsuario] = useState(nombre);
    const [rolUsuario] = useState(rol);
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
    const [activeItem, setActiveItem] = useState<number>(1); // Por defecto "Resultados"
    const navigate = useNavigate();

    const toggleSubmenu = (id: number) => {
        setActiveSubmenu(prev => (prev === id ? null : id));
    };

    const handleItemClick = (item: any) => {
        setActiveItem(item.id);
        if (item.hasArrow) {
            toggleSubmenu(item.id);
        } else if (item.icon.route) {
            navigate(item.icon.route);
        } else if (item.icon.action) {
            item.icon.action();
        }
    };

    return (
        <aside
            className={`
                fixed md:relative top-[77px] md:top-0 left-0 z-40
                w-[268px] h-[calc(100vh-77px)] md:h-auto
                bg-white border-r shadow p-2 border-gray-200
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}
        >
            <div className="p-6">
                {/* Logo */}
                <div className="mb-6 pl-2">
                    <h1 className="text-lg font-semibold">{nombreUsuario}</h1>
                    <p className="text-sm text-green-600">{rolUsuario}</p>
                </div>

                {/* Menu */}
                <nav className="space-y-1">
                    {SidebarData.navigate.map((item) => (
                        <div key={item.id}>
                            <button
                                type="button"
                                className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg cursor-pointer group focus:outline-none"
                                onClick={() => handleItemClick(item)}
                                onMouseOver={(e) => item.icon.onMouseOver(e)}
                                onMouseOut={(e) => {
                                    if (activeItem !== item.id) {
                                        item.icon.onMouseOut(e);
                                    }
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        className="w-4 h-4 object-cover"
                                        alt={`${item.title} icon`}
                                        src={activeItem === item.id ? item.icon.hover : item.icon.default}
                                    />
                                    <span
                                        className={`font-normal text-sm transition-colors ${activeItem === item.id
                                            ? 'text-[#155dfc]'
                                            : 'text-gray-600 group-hover:text-[#155dfc]'
                                            }`}
                                    >
                                        {item.title}
                                    </span>
                                </div>
                                {item.hasArrow && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className={`size-3.5 transition-transform duration-200 ${activeItem === item.id
                                            ? 'text-[#155dfc]'
                                            : 'text-gray-400 group-hover:text-[#155dfc]'
                                            } ${activeSubmenu === item.id ? 'rotate-0' : 'rotate-270'}`}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                        />
                                    </svg>
                                )}
                            </button>


                            {/* Submenu */}
                            <AnimatePresence>
                                {item.hasArrow && activeSubmenu === item.id && (
                                    <motion.div
                                        className="ml-8 mt-1 space-y-1"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                    >
                                        {item.children?.map((sub) => (
                                            <button
                                                key={sub.id}
                                                onClick={sub.action}
                                                className="block w-full text-left text-[13px] text-gray-500 hover:text-[#155dfc] hover:bg-gray-100 rounded p-1 cursor-pointer"
                                            >
                                                {sub.title}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </nav>

                {/* Footer Logos */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <img
                        className="w-[121px] h-[68px] object-contain"
                        alt="WhatsApp logo"
                        src="https://c.animaapp.com/DhO0cdaV/img/whatsapp-image-2025-07-03-at-9-34-32-am-removebg-preview-2.svg"
                    />
                    <img
                        className="w-[98px] h-[55px] object-contain"
                        alt="Ciudad Bienestar logo"
                        src="https://c.animaapp.com/DhO0cdaV/img/logo-ciudad-bienestar-mesa-de-trabajo-1-removebg-preview-1.svg"
                    />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
