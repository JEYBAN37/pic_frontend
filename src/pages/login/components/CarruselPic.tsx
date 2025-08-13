import React, { useEffect, useState } from 'react';
import type { ItemsCarrusel } from '../data/data';

interface CarruselPicProps {
    items: ItemsCarrusel[];
}

const CarruselPic: React.FC<CarruselPicProps> = ({ items }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % items.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [items.length]);

    return (
        <div className="relative w-[300px] sm:w-[500px] lg:w-[1000px] overflow-hidden rounded-2xl shadow-2xl shadow-blue-950 mt-6">
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 w-full flex flex-col lg:flex-row lg:items-center bg-white "
                    >
                        {/* Columna de texto o componente */}
                        <div className="flex flex-col justify-center px-[3%] py-[5%] lg:w-1/2 lg:h-max">
                            {item.component ? (
                                <div className="w-full h-full flex flex-col">
                                    <item.component {...(item.props || {})} />
                                </div>
                            ) : (
                                <>
                                    No hay componente para este slide
                                </>
                            )}
                        </div>


                        {/* Columna de imagen */}
                        <div className="w-full  lg:w-1/2 lg:h-full bg-gray-200 flex items-center justify-center">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="object-cover w-full h-full rounded-r-2xl"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`cursor-pointer hover:bg-blue-500 w-3 h-3 rounded-full ${current === i ? 'bg-blue-500' : 'bg-[#e4e4e4]'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CarruselPic;
