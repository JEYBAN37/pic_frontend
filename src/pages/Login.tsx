import React, { useEffect } from 'react';
import FormLogin from '../components/FormLogin';
import NavBar from '../components/NavBar';
import { IntroduccionPIC, ItemsLogin, ItemsNavbar, Resultado } from '../data/data';
import { OrbserverFunction } from '../logic/observer';
import PoblacionesSection from '../components/PoblacionesSection';
import IntroduccionSection from '../components/IntroduccionSection';
import { GetStadistics } from '../logic/get';
import ResultadosSection, { type ResultadosProps } from '../components/ResultadosSection';

const Login: React.FC = () => {
    const [activeSection, setActiveSection] = React.useState('Inicio');
    const [data, setData] = React.useState({ count: 0 });
    const [error] = React.useState<string | null>(null);



    const ItemsResultados: ResultadosProps = {
        resultadoSlides: Resultado,
        countParticipantes: data.count || 0,
        countActividades: 855,
        countPoblaciones: [15, 45, 23, 12, 30, 5],
        labelsDona: ["Primera Infancia", "Infancia", "Adolescencia", "Juventud", "Adultez", "Adultos Mayores"],
        labelsGenero: ["Masculino", "Femenino", "LGTBIQ+"],
        countGeneros: [5, 6, 2],
    };

    useEffect(() => {
        GetStadistics('/responsables/viewAnalitic', setData, showAlert);
    }, []);


    const showAlert = (msg: string) => {
        alert(msg);
    };

    useEffect(() => {
        if (error) {
            showAlert(error);
        }
        const sections = document.querySelectorAll('section[id]');
        const observer = OrbserverFunction(setActiveSection);
        sections.forEach((section) => observer.observe(section));
        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);


    return (
        <div className='flex w-full overflow-hidden bg-white flex-col'>
            {/* Navbar lateral derecha fija */}

            <NavBar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                itemsNavbar={ItemsNavbar}
            />

            {/* Contenido principal */}
            <main className="flex flex-col w-full ">
                <section id="Inicio" className="flex flex-col lg:flex-row  min-h-screen p-1 sm:px-6 sm:pt-2 sm:pb-0 items-center justify-center">
                    <div className="basis-1/4 lg:basis-1/2 flex flex-col items-start justify-center w-full p-[8%] lg:pl-[5%] lg:py-0 lg:pr-0 lg:h-full">
                        <h1 className="text-4xl text-blue-600 lg:text-7xl font-bold lg:mb-1 hover:text-blue-300 cursor-pointer">{ItemsLogin.title}</h1>
                        <h1 className="text-4xl text-[#a5cd6a] lg:text-7xl font-bold lg:mb-1 hover:text-blue-300 cursor-pointer">{ItemsLogin.subtitle}</h1>
                        <p className="text-sm lg:text-2xl text-gray-500  lg:pl-1 lg:mt-4 hover:text-black cursor-pointer">{ItemsLogin.welcomeMessage}</p>
                        <p className="hidden lg:block text-sm lg:text-md text-gray-500 lg:mt-2 lg:pr-[10%] lg:pl-1 hover:text-black cursor-pointer"><strong>{ItemsLogin.pic}</strong>{ItemsLogin.mensage}</p>
                    </div>
                    <div className=' basis-1/2 flex items-center justify-center lg:justify-end h-full mt-10 lg:pr-[10%]'>
                        <FormLogin />
                    </div>
                </section>

                {/* Sección de Experiencia */}
                <IntroduccionSection ItemsLogin={ItemsLogin} IntroduccionPIC={IntroduccionPIC} />


                {/* Sección de Resultados */}
                <ResultadosSection {...ItemsResultados} />

                {/* Sección de Poblaciones */}
                <PoblacionesSection />


            </main>
        </div>

    );
};

export default Login;