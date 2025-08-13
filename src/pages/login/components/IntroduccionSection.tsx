import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CarruselPic from "./CarruselPic";

interface IntroduccionSectionProps {
  ItemsLogin: {
    introduccion: string;
    detail: string;
  };
  IntroduccionPIC: {
    img: string;
    title: string;
    component?: React.ComponentType<any>;
    props?: any;
  }[];
}

export default function IntroduccionSection({
  ItemsLogin,
  IntroduccionPIC,
}: Readonly<IntroduccionSectionProps>) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="Introduccion"
      className="bg-white px-32 py-[10%] flex flex-col justify-center items-center"
      initial={{ opacity: 0, y: 100 }}       // Estado inicial (fuera de vista, abajo)
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }} // Entrada/Salida
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-4xl text-blue-600 lg:text-6xl font-bold mb-2 hover:text-[#a5cd6a] cursor-pointer text-center">
        {ItemsLogin.introduccion}
      </h1>
      <p className="text-white font-semibold hover:text-[#a5cd6a] cursor-pointer text-center">
        {ItemsLogin.detail}
      </p>

      <div className="mt-8 w-full flex justify-center">
        <CarruselPic items={IntroduccionPIC} />
      </div>
    </motion.section>
  );
}
