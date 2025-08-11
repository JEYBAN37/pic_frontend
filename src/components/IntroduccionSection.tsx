import { useState } from "react";
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

export default function IntroduccionSection({ ItemsLogin, IntroduccionPIC }: IntroduccionSectionProps ) {
  const [showCarrusel, setShowCarrusel] = useState(false);

  return (
    <section
      id="Introduccion"
      className="bg-blue-600 flex min-h-screen flex-col justify-center items-center overflow-hidden-lg"
    >
      <button
        type="button"
        onClick={() => setShowCarrusel(!showCarrusel)}
        className={`flex flex-col items-center transition-all duration-500
        } focus:outline-none bg-transparent border-none p-0`}
        aria-pressed={showCarrusel}
      >
        <h1 className="text-4xl text-white lg:text-6xl font-bold mb-2  hover:text-[#a5cd6a] cursor-pointer text-center">
          {ItemsLogin.introduccion}
        </h1>
        <p className="text-white text- font-semibold hover:text-[#a5cd6a] cursor-pointer text-center">
          {ItemsLogin.detail}
        </p>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out ${
          showCarrusel ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        {showCarrusel && <CarruselPic items={IntroduccionPIC} />}
      </div>
    </section>
  );
}
