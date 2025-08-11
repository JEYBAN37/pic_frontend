import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SliderItemsPoblaciones, SliderItemsTecnologias } from "../data/data";
import Carousel from "./CarrosuelPoblaciones";

export default function Poblaciones() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="Poblaciones"
      className="relative flex min-h-[1300px] items-center justify-start bg-[#a5cd6a] overflow-hidden"
    >
      {/* Contenedor título (se achica si el panel se abre) */}
      <motion.div
        animate={{ width: visible ? "30%" : "100%" }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center "
      >
        <h1 className="sm:text-2xl md:text-3xl lg:text-5xl font-bold text-blue-600 text-center">
          Poblaciones
        </h1>
      </motion.div>

      {/* Panel lateral animado */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute flex flex-col justify-center items-center top-0 right-0 min-h-[1300px] bg-white shadow-xl w-[70%]"
          >
            {/* Primera sección */}
            <div className="w-full flex flex-col justify-items-center m-10 gap-4">
              <h1 className="text-5xl hover:text-blue-500 font-bold text-blue-600  cursor-pointer text-center">
                ¿Qué Atención Reciben?
              </h1>
              <p className="text-center text-sm font-normal text-gray-400">
                Las poblaciones especiales reciben atención diferenciada que respeta
                sus contextos culturales y necesidades específicas.
              </p>
            </div>

            <div className="w-full flex flex-col md:flex-row items-center justify-center px-[10%]">
              <Carousel items={SliderItemsPoblaciones} />
            </div>

            {/* Segunda sección */}
            <div className="w-full flex flex-col justify-items-center m-10 gap-4">
              <h1 className="text-5xl hover:text-blue-500 font-bold text-blue-600 cursor-pointer text-center">
                Tecnologías PIC y Estrategias Implementadas
              </h1>
              <p className="text-center text-sm font-normal text-gray-400">
                Estas acciones se desarrollan en entornos comunitarios, instituciones educativas, organizaciones sociales y económicos informales del municipio.
              </p>
            </div>

            <div className="w-full flex flex-col md:flex-row items-center justify-center px-[10%]">
              <Carousel items={SliderItemsTecnologias} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
