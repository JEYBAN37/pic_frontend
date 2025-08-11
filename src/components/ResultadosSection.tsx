import { useState } from "react";
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
    return (
        <section
            id="Resultados"
            className="relative flex min-h-screen items-center justify-start bg-white"
        >
            {/* Contenedor título */}
            <div
                className={`h-full  flex items-center transition-all duration-500 justify-center ${open ? "w-[30%]" : "w-full  "
                    }`}
            >
                <button
                    onClick={() => setOpen(!open)}
                    className="sm:text-2xl md:text-3xl lg:text-5xl hover:text-[#a5cd6a] font-bold text-blue-600  cursor-pointer text-center transition-transform duration-500 z-10 bg-transparent border-none outline-none"
                    style={{ appearance: "none" }}
                    aria-label="Mostrar u ocultar resultados"
                    type="button"
                >
                    Resultados
                </button>
            </div>

            {/* Panel lateral */}
            <div
                className={`absolute top-0 right-0  h-full bg-blue-600 shadow-xl transition-transform duration-500 ${open ? "translate-x-0 w-[70%]" : "translate-x-full w-[70%]"
                    }`}
            >
                <div className="w-full h-full flex flex-col items-center justify-center mt-6 2xl:gap-4  px-[4%] lg:px-[8%]">
                    <h2 className="text-white text-2xl lg:text-3xl font-semibold">Resultados Generales PIC 2025</h2>
                    <div className="flex flex-row justify-around w-full mt-8">
                        <div className="flex flex-col items-center justify-center basis-1/2">
                            {resultadosProps.resultadoSlides.slidesData.map((slide, idx) => {
                                // Reemplazar placeholders en el texto
                                let textoProcesado = slide.text
                                    .replace("{countParticipantes}", resultadosProps.countParticipantes.toString())
                                    .replace("{countActividades}", resultadosProps.countActividades.toString());

                                return (
                                    <div className="flex flex-col items-center mb-8" key={idx}>
                                        <p className="text-white text-lg lg:text-2xl font-semibold">{slide.title}</p>
                                        <p className="text-[#a5cd6a] text-2xl lg:text-3xl xl:text-4xl font-bold">{textoProcesado}</p>
                                    </div>
                                );
                            })}

                        </div>
                        <div className="flex justify-center basis-1/2">
                            <img src={resultadosProps.resultadoSlides.img} alt={resultadosProps.resultadoSlides.title} className="px-4 lg:w-[350px]" />
                        </div>
                    </div>
                    <div className="mt-4 w-full">
                        <div className="text-white text-lg lg:text-2xl font-semibold">{resultadosProps.resultadoSlides.text}</div>
                        <p className="text-white text-md mt-4">{resultadosProps.resultadoSlides.paragraph}</p>
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
                    </div>

                </div>
            </div>
        </section>



    );
}
