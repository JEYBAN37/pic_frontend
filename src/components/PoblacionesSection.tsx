import { useState } from "react";
import GraficoTorta from "../atoms/GraficoTorta";
import GraficoBarras from "../atoms/GraficoBarras";
import { SliderItemsPoblaciones, type ResultadoStructure } from "../data/data";
import Carousel from "./CarrosuelPoblaciones";


export interface ResultadosProps {
  resultadoSlides: ResultadoStructure;
  countParticipantes: number;
  countActividades: number;
  countPoblaciones: number[];
  labelsGenero: string[];
  labelsDona: string[];
  countGeneros: number[];
}

export default function Poblaciones() {

  const [open, setOpen] = useState(false);
  return (
    <section
      id="Poblaciones"
      className="relative flex min-h-screen items-center justify-start bg-[#a5cd6a]"
    >
      {/* Contenedor título */}
      <div
        className={`h-full  flex items-center transition-all duration-500 justify-center ${open ? "w-[30%]" : "w-full  "
          }`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="sm:text-2xl md:text-3xl lg:text-5xl hover:text-white font-bold text-blue-600  cursor-pointer text-center transition-transform duration-500 z-10 bg-transparent border-none outline-none"
          style={{ appearance: "none" }}
          aria-label="Mostrar u ocultar resultados"
          type="button"
        >
          Poblaciones
        </button>
      </div>

      {/* Panel lateral */}
      <div
        className={`absolute top-0 right-0  h-full bg-white shadow-xl transition-transform duration-500 ${open ? "translate-x-0 w-[70%]" : "translate-x-full w-[70%]"
          }`}
      >
        <div className="w-full h-full flex flex-col md:flex-row items-center  justify-center mt-6 py-[20%]  px-[4%] lg:px-[4%]">
          <Carousel items={SliderItemsPoblaciones} />
        </div>
      </div>
    </section>



  );
}
