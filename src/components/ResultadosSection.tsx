import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import GraficoTorta from "../atoms/GraficoTorta";
import GraficoBarras from "../atoms/GraficoBarras";
import type { ResultadoStructure } from "../data/data";

export interface ResultadosProps {
    resultadoSlides: ResultadoStructure;
    countParticipantes: number;
    countActividades: number;
    countPoblaciones: number[];
    labelsGenero: string[];
    labelsDona: string[];
    countGeneros: number[];
}

export default function Resultados(resultadosProps: Readonly<ResultadosProps>) {
    const [open, setOpen] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setOpen(entry.isIntersecting); // abre si está visible, cierra si no
                });
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="Resultados"
            className="relative flex h-[1000px] overflow-x-hidden items-center justify-start bg-blue-600"
        >
            {/* Título (se achica cuando el panel se abre) */}
            <motion.div
                animate={{ width: open ? "30%" : "100%" }}
                transition={{ duration: 0.5 }}
                className="h-full flex items-center justify-center"
            >
                <h1 className="sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white  text-center">
                    Resultados
                </h1>
            </motion.div>

            {/* Panel lateral animado */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: open ? "0%" : "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute top-0 right-0 h-[1000px] bg-white shadow-xl w-[70%] flex flex-col items-center justify-center px-[4%] lg:px-[6%]"
            >
                <div className="flex flex-col items-center justify-center w-full  p-8 rounded-2xl border border-gray-300 shadow-2xl">
                    <h2 className="text-blue-600 text-2xl lg:text-3xl font-bold">
                        Resultados Generales PIC 2025
                    </h2>

                    <div className="flex flex-row justify-around w-full mt-12">
                        <div className="flex flex-col items-center justify-center basis-1/2">
                            {resultadosProps.resultadoSlides.slidesData.map((slide, idx) => {
                                let textoProcesado = slide.text
                                    .replace("{countParticipantes}", resultadosProps.countParticipantes.toString())
                                    .replace("{countActividades}", resultadosProps.countActividades.toString());

                                return (
                                    <div className="flex flex-col items-center mb-8" key={idx}>
                                        <p className="text-gray-400 text-lg lg:text-2xl font-semibold">
                                            {slide.title}
                                        </p>
                                        <p className="text-[#a5cd6a] text-2xl lg:text-3xl xl:text-4xl font-bold">
                                            {textoProcesado}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-center basis-1/2">
                            <img
                                src={resultadosProps.resultadoSlides.img}
                                alt={resultadosProps.resultadoSlides.title}
                                className="px-4 lg:w-[350px]"
                            />
                        </div>
                    </div>

                    <div className="mt-4 w-full">
                        <div className="text-gray-400 text-lg lg:text-2xl font-semibold">
                            {resultadosProps.resultadoSlides.text}
                        </div>
                        <p className="text-gray-500 text-sm mt-4">
                            {resultadosProps.resultadoSlides.paragraph}
                        </p>
                    </div>

                    <div className="mt-8 w-full flex flex-col lg:flex-row justify-center items-center gap-4">
                        <GraficoTorta
                            countPoblaciones={resultadosProps.countPoblaciones}
                            labelsDona={resultadosProps.labelsDona}
                        />
                        <GraficoBarras
                            countGeneros={resultadosProps.countGeneros}
                            labels={resultadosProps.labelsGenero}
                        />
                    </div></div>


            </motion.div>
        </section>
    );
}
