import React from 'react';
import type { DashboardCardProps } from '../data/data';
import GraficoTorta from '../atoms/GraficoTorta';

const Dashboard: React.FC = () => {

    // Dashboard cards data
    const dashboardCards: DashboardCardProps[] = [
        {
            id: 1,
            title: "Observaciones",
            propiedades: {
                count: [120, 200, 150],
                labelsDona: ["Niños", "Adultos", "Mayores", "Ancianos", "Adolescentes", "Jóvenes"],
                backgroundColor: ["#53a4ff", "#2b7eff", "#155dfc", "#2a7dff", "#155DFD", "#0039CB"]
            },
            render: (props) => <GraficoTorta {...props} />
        },
        {
            id: 2,
            title: "Planes En Progreso",
            propiedades: {
                count: [100, 150, 200],
                labelsDona: ["Niños", "Adultos", "Mayores"],
                backgroundColor: ["#2dfb78", "#02e556", "#00bf43", "#00bf43"]
            },
            render: (props) => <GraficoTorta {...props} />
        },
        {
            id: 3,
            title: "Actividades Desarrolladas",
            propiedades: {
                count: [80, 120, 100],
                labelsDona: ["Niños", "Adultos", "Mayores"],
                backgroundColor: ["#53a4ff", "#02e556", "#155DFD"]
            },
            render: (props) => <GraficoTorta {...props} />
        },
        {
            id: 1,
            title: "Observaciones",
            propiedades: {
                count: [120, 200, 150],
                labelsDona: ["Niños", "Adultos", "Mayores", "Ancianos", "Adolescentes", "Jóvenes"],
                backgroundColor: ["#53a4ff", "#2b7eff", "#155dfc", "#2a7dff", "#155DFD", "#0039CB"]
            },
            render: (props) => <GraficoTorta {...props} />
        },
        {
            id: 2,
            title: "Planes En Progreso",
            propiedades: {
                count: [100, 150, 200],
                labelsDona: ["Niños", "Adultos", "Mayores"],
                backgroundColor: ["#2dfb78", "#02e556", "#00bf43", "#00bf43"]
            },
            render: (props) => <GraficoTorta {...props} />
        },
        {
            id: 3,
            title: "Actividades Desarrolladas",
            propiedades: {
                count: [80, 120, 100],
                labelsDona: ["Niños", "Adultos", "Mayores"],
                backgroundColor: ["#53a4ff", "#02e556", "#155DFD"]
            },
            render: (props) => <GraficoTorta {...props} />
        }
    ];
    return (
        <>
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

                            <div className="w-full h-[400px] 2xl:h-[300px] rounded-2xl  bg-white relative overflow-hidden shadow p-2  border border-gray-200">
                                <h3 className="absolute font-semibold text-black text-xl pl-6 py-4">
                                    {card.title}
                                </h3>
                                {card.render ? card.render(card.propiedades) : null}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
};

export default Dashboard;