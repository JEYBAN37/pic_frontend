import React, { useState } from 'react';
import { DataHome } from '../data/data';

const Navbar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <nav className="w-full h-[77px] fixed top-0 left-0 z-50 shadow p-2 bg-white border-b border-gray-200  ">
            <div className="flex items-center justify-between h-full px-4">
                <div className="flex items-center gap-4">
                    <img
                        className="w-12 h-[72px] object-cover"
                        alt={DataHome.alt}
                        src={DataHome.img}
                    />
                    <a href={DataHome.href}>
                        <h2 className="text-[#155dfc] text-2xl md:text-[40px] font-bold whitespace-nowrap hover:text-[#a5cd6a]">
                            {DataHome.title}
                        </h2>
                    </a>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <div className="w-6 h-6 flex flex-col justify-center items-center">
                        <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isSidebarOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                        <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isSidebarOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isSidebarOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                    </div>
                </button>

                {/* Desktop Header Icons */}
                <div className="hidden md:flex items-center gap-6">
                    {DataHome.icons.map(icon => (
                        <button
                            key={icon.key}
                            type="button"
                            className="p-0 bg-transparent border-none"
                            onClick={icon.action}
                            onMouseOver={icon.onMouseOver}
                            onMouseOut={icon.onMouseOut}
                            aria-label={`Ir a ${icon.key}`}
                        >
                            <img
                                className="w-5 h-5 object-cover cursor-pointer"
                                alt={DataHome.alt}
                                src={icon.default}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;