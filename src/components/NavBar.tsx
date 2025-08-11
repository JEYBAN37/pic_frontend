import React from 'react';
import { Link } from 'react-scroll';

export interface NavBarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    itemsNavbar: any;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection , itemsNavbar }) => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow p-2">
            <div className="flex items-center">
                <h2 className="basis-1/4 text-3xl font-bold text-blue-600 pl-8">Ciudad Bienestar</h2>
                <div className="hidden xl:flex flex-1 justify-center  xl:space-x-5 2xl:space-x-16">
                    {itemsNavbar.items.map((section: string, index: React.Key) => (
                        <Link
                            key={index}
                            to={section}
                            smooth={true}
                            duration={500}
                            offset={-10} // para que no tape la navbar fija
                            className={`flex cursor-pointer transition-all duration-300 text-sm xl:text-normal font-semibold tracking-wide 
                            ${activeSection === section
                                    ? 'text-[#a5cd6a]'
                                    : 'text-gray-700 hover:drop-shadow-[0_0_9px_#8bb6fd]'}
    `}
                        >
                            {section}
                        </Link>
                    ))}
                </div>
                <div className='flex items-center justify-end basis-1/4 pr-8'>
                    <a href={itemsNavbar.ciudadBienestar.href}><img src={itemsNavbar.ciudadBienestar.src} alt={itemsNavbar.ciudadBienestar.alt} className='h-12 ml-4 pr-6' /></a>
                    <a href={itemsNavbar.logoPasto.href}><img src={itemsNavbar.logoPasto.src} alt={itemsNavbar.logoPasto.alt} className='h-12'/></a>
                </div>
            </div>

        </nav>
    );
};

export default NavBar;