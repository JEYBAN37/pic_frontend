import { icons } from "lucide-react";
import logoPic from "../../../assets/logoPic.png";
import homeLogo from "../../../assets/hogar.svg";
import homeHover from "../../../assets/hogarHover.svg";
import ayuda from "../../../assets/ayuda.svg";
import ayudaHover from "../../../assets/ayudaHover.svg";
import ssesion from "../../../assets/cerrarSesion.svg";
import ssesionHover from "../../../assets/cerrarSesionHover.svg";

type IconData = {
    key: string;
    default: string;
    hover: string;
    href: string;
    action?: () => void;
};

const iconsArray: IconData[] = [
    {
        key: "home",
        default: homeLogo,
        hover: homeHover,
        href: "http://localhost:5173/react/#/homePage",
        action: () => { window.location.href = "http://localhost:5173/react/#/homePage"; }
    },
    {
        key: "ayuda",
        default: ayuda,
        hover: ayudaHover,
        href: "http://localhost/PIC/users/home",
        action: () => { window.location.href = "http://localhost/PIC/users/home"; }
    },
    {
        key: "cerrarSesion",
        default: ssesion,
        hover: ssesionHover,
        href: "http://localhost/PIC/users/salir",
        action: () => { window.location.href = "http://localhost/PIC/users/salir"; }
    },
];

function handleMouseOver(e: any, hoverSrc: string) {
    const img = e.currentTarget.querySelector('img');
    if (img) img.src = hoverSrc;
}

function handleMouseOut(e: any, defaultSrc: string) {
    const img = e.currentTarget.querySelector('img');
    if (img) img.src = defaultSrc;
}

export const DataHome = {
    img: logoPic,
    alt: "Main logo",
    href: "http://localhost:5173/react/#/homePage",
    title: "SICB",
    icons: iconsArray.map(icon => ({
        key: icon.key,
        default: icon.default,
        hover: icon.hover,
        action: icon.action ?? (() => { window.location.href = icon.href; }),
        onMouseOver: (e: any) => handleMouseOver(e, icon.hover),
        onMouseOut: (e: any) => handleMouseOut(e, icon.default),
    })),
    information: icons.Info,
    settings: icons.Settings,
};
