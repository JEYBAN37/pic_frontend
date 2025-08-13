import React, { useState } from 'react';
import { Link } from 'react-scroll';

export interface NavBarProps {
    activeSection: string;
    itemsNavbar: any;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection, itemsNavbar }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow p-2">
            <div className="flex items-center justify-between">

                {/* título de la aplicación */}
                <h2 className="hidden order-2 xl:block basis-1/4 text-sm sm:text-xl font-bold text-blue-600  xl:text-3xl">{itemsNavbar.subtitle}</h2>

                {/* enlaces de navegación */}
                <div className="order-3 hidden flex-1 justify-center xl:flex xl:space-x-5 2xl:space-x-16">
                    {itemsNavbar.items.map((section: string) => (
                        <Link
                            key={section}
                            to={section}
                            smooth={true}
                            duration={500}
                            offset={-10}
                            className={`flex cursor-pointer transition-all duration-300 text-sm xl:text-normal font-semibold tracking-wide 
                            ${activeSection === section
                                    ? 'text-[#a5cd6a]'
                                    : 'text-gray-700 hover:drop-shadow-[0_0_9px_#8bb6fd]'}`}
                        >
                            {section}
                        </Link>
                    ))}
                </div>

                {/* botón de menú para pantallas pequeñas */}
                <div className="order-1 basis-1/4 flex justify-start xl:hidden relative">
                    <button
                        className="p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    {showMenu && (
                        <div className="absolute top-0 mt-12 w-48 bg-white shadow-lg rounded-md z-50">
                            {itemsNavbar.items.map((section: string) => (
                                <Link
                                    key={section}
                                    to={section}
                                    smooth={true}
                                    duration={500}
                                    offset={-10}
                                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ml-4
                                    ${activeSection === section ? 'text-[#a5cd6a]' : 'text-gray-700'}`}
                                    onClick={() => setShowMenu(false)}
                                >
                                    {section}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* enlaces de redes sociales */}
                <div className='order-3 xl:basis-1/4 flex items-center justify-center xl:justify-end xl:pr-8'>
                    <a href={itemsNavbar.ciudadBienestar.href}><img src={itemsNavbar.ciudadBienestar.src} alt={itemsNavbar.ciudadBienestar.alt} className='h-12 ml-4 pr-6' /></a>
                    <a href={itemsNavbar.logoPasto.href}><img src={itemsNavbar.logoPasto.src} alt={itemsNavbar.logoPasto.alt} className='h-12' /></a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
