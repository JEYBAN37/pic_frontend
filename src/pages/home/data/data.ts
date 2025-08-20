import { icons } from "lucide-react";
import logoPic from "../../../assets/logoPic.png";
import homeLogo from "../../../assets/hogar.png";
import homeHover from "../../../assets/hogarHover.svg";
import ayuda from "../../../assets/ayuda.png";
import ayudaHover from "../../../assets/ayudaHover.svg";
import ssesion from "../../../assets/cerrarSesion.png";
import ssesionHover from "../../../assets/cerrarSesionHover.svg";
import pLogo from "../../../assets/pastoLogo.svg";
import pLogoHover from "../../../assets/pastoLogoHover.svg";
import planSesionImage from "../../../assets/portaPapeles.svg";
import planSesionHover from "../../../assets/portaPapelesHover.svg";
import doc from "../../../assets/documento.png";
import docHover from "../../../assets/docHover.svg";
import anexo from "../../../assets/anexo.png";
import anexoHover from "../../../assets/anexoHover.svg";
import resultados from "../../../assets/resultados.png";
import resultadosHover from "../../../assets/resultadosHover.png";
import historico from "../../../assets/historico.png";
import historicoHover from "../../../assets/historicoHover.svg";
import adminHover from "../../../assets/admin.png";
import admin from "../../../assets/adminHover.png";
import type { UserType } from "../components/UserAdmin";

export const URLCAKE: string = "http://localhost/PIC";


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
    href: `${URLCAKE}/react/#/homePage`,
    action: () => {
      window.location.href = `${URLCAKE}/react/#/homePage`;
    },
  },
  {
    key: "ayuda",
    default: ayuda,
    hover: ayudaHover,
    href: `${URLCAKE}/users/home`,
    action: () => {
      window.location.href = `${URLCAKE}/users/home`;
    },
  },
  {
    key: "cerrarSesion",
    default: ssesion,
    hover: ssesionHover,
    href: `${URLCAKE}/users/salir`,
    action: () => {
      window.location.href = `${URLCAKE}/users/salir`;
    },
  },
];

function handleMouseOver(e: any, hoverSrc: string) {
  const img = e.currentTarget.querySelector("img");
  if (img) img.src = hoverSrc;
}

function handleMouseOut(e: any, defaultSrc: string) {
  const img = e.currentTarget.querySelector("img");
  if (img) img.src = defaultSrc;
}

export const DataHome = {
  img: logoPic,
  alt: "Main logo",
  href: `${URLCAKE}/react/#/homePage`,
  title: "SICB",
  adminIcon: {
    default: admin,
    hover: adminHover,
    href: `${URLCAKE}/users/home`,
    onMouseOver: (e: any) => handleMouseOver(e, adminHover),
    onMouseOut: (e: any) => handleMouseOut(e, admin),
  },
  icons: iconsArray.map((icon) => ({
    key: icon.key,
    default: icon.default,
    hover: icon.hover,
    action:
      icon.action ??
      (() => {
        window.location.href = icon.href;
      }),
    onMouseOver: (e: any) => handleMouseOver(e, icon.hover),
    onMouseOut: (e: any) => handleMouseOut(e, icon.default),
  })),
  information: icons.Info,
  settings: icons.Settings,
};

export const SidebarData = {
  title: "Secretaria",
  subtitle: "de Salud",
  ref: "https://www.saludpasto.gov.co/",
  logo: {
    default: pLogo,
    alt: "Logo Secretaria de Salud",
    hover: pLogoHover,
    action: () => {
      window.location.href = SidebarData.ref;
    },
    onMouseOver: (e: any) => handleMouseOver(e, SidebarData.logo.hover),
    onMouseOut: (e: any) => handleMouseOut(e, SidebarData.logo.default),
  },

  navigate: [
    {
      id: 1,
      title: "Resultados",
      icon: {
        default: resultados,
        hover: resultadosHover,
        route: "/homePage/dashboard" ,
        onMouseOver: (e: any) => handleMouseOver(e, resultadosHover),
        onMouseOut: (e: any) => handleMouseOut(e, resultados),
      },
      children: [
        { id: "2-1", title: "Ver todas", action: () => console.log("Todas") },
        { id: "2-2", title: "Crear nueva", action: () => console.log("Nueva") },
      ],
      hasArrow: false,
    },
    {
      id: 2,
      title: "Sistematizaciones",
      icon: {
        default: doc,
        hover: docHover,
        action: () => {
          window.location.href = `${URLCAKE}users/sistematizaciones`;
        },
        children: [
          { id: "2-1", title: "Ver todas", action: () => console.log("Todas") },
          {
            id: "2-2",
            title: "Crear nueva",
            action: () => console.log("Nueva"),
          },
        ],
        onMouseOver: (e: any) => handleMouseOver(e, docHover),
        onMouseOut: (e: any) => handleMouseOut(e, doc),
      },
      children: [
        {
          id: "2-1",
          title: "Registros Sistematizaciones",
          action: () =>
            (window.location.href = `${URLCAKE}proactividades/index`),
        },
        {
          id: "2-2",
          title: "Nueva Sistematizacion",
          action: () => (window.location.href = `${URLCAKE}proactividades/add`),
        },
        {
          id: "2-3",
          title: "Registros Sesiones",
          action: () =>
            (window.location.href = `${URLCAKE}sistematizacionprocesosviewtests/nuebus`),
        },
        {
          id: "2-4",
          title: "Agregar Sesion",
          action: () =>
            (window.location.href = `${URLCAKE}procesoregistros/add`),
        },
      ],
      hasArrow: true,
    },
    {
      id: 3,
      title: "Actas",
      icon: {
        default: doc,
        hover: docHover,
        action: () => {
          window.location.href = `${URLCAKE}users/sistematizaciones`;
        },
        onMouseOver: (e: any) => handleMouseOver(e, docHover),
        onMouseOut: (e: any) => handleMouseOut(e, doc),
      },
      children: [
        {
          id: "3-1",
          title: "Registros Actas",
          action: () => (window.location.href = `${URLCAKE}actas/index`),
        },
        {
          id: "3-2",
          title: "Agregar Acta",
          action: () => (window.location.href = `${URLCAKE}actas/add`),
        },
      ],
      hasArrow: true,
    },
    {
      id: 4,
      title: "Anexo Técnico",
      icon: {
        default: anexo,
        hover: anexoHover,
        action: () => {
          window.location.href = `${URLCAKE}users/anexo-tecnico`;
        },
        onMouseOver: (e: any) => handleMouseOver(e, anexoHover),
        onMouseOut: (e: any) => handleMouseOut(e, anexo),
      },
      children: [
        {
          id: "4-1",
          title: "Productos",
          action: () => (window.location.href = `${URLCAKE}productos/index`),
        },
      ],
      hasArrow: true,
    },
    {
      id: 5,
      title: "Planes de Sesion",
      icon: {
        default: planSesionImage,
        hover: planSesionHover,
        action: () => {
          window.location.href = `${URLCAKE}users/planes-sesion`;
        },
        onMouseOver: (e: any) => handleMouseOver(e, planSesionHover),
        onMouseOut: (e: any) => handleMouseOut(e, planSesionImage),
      },
      children: [
        {
          id: "5-1",
          title: "Registros Planes de Sesion",
          action: () => (window.location.href = `${URLCAKE}plsesiones/nuebus`),
        },
        {
          id: "5-2",
          title: "Agregar Plan de Sesion",
          action: () => (window.location.href = `${URLCAKE}plsesiones/add`),
        },
      ],
      hasArrow: true,
    },
    {
      id: 6,
      title: "Informes Eventos",
      icon: {
        default: doc,
        hover: docHover,
        action: () => {
          window.location.href = `${URLCAKE}users/sistematizaciones`;
        },
        onMouseOver: (e: any) => handleMouseOver(e, docHover),
        onMouseOut: (e: any) => handleMouseOut(e, doc),
      },
      children: [
        {
          id: "6-1",
          title: "Registros Eventos",
          action: () => console.log("Todas"),
        },
        {
          id: "6-2",
          title: "Agregar Evento",
          action: () => console.log("Nueva"),
        },
      ],
      hasArrow: true,
    },
    {
      id: 7,
      title: "Historico PIC",
      icon: {
        default: historico,
        hover: historicoHover,
        action: () => {
          window.location.href = `${URLCAKE}users/resultados`;
        },
        onMouseOver: (e: any) => handleMouseOver(e, historicoHover),
        onMouseOut: (e: any) => handleMouseOut(e, historico),
      },
      children: [
        {
          id: "7-1",
          title: "PIC 2024",
          action: () =>
            (window.location.href = `${URLCAKE}/SICB/pic2024/users/home`),
        },
        {
          id: "7-2",
          title: "PIC 2023",
          action: () =>
            (window.location.href = `${URLCAKE}/SICB/pic2023/users/home`),
        },
        {
          id: "7-3",
          title: "PIC 2022",
          action: () =>
            (window.location.href = `${URLCAKE}/SICB/pic2022/users/home`),
        },
      ],
      hasArrow: true,
    },
  ],
};

 export interface User {
        id: string;
        username: string;
        nivel: string;
        nombre: string;
        group_id: string;
    }

export interface DashboardCardProps {
        id: number;
        title: string;
        propiedades: {
            count: number[];
            labelsDona: string[];
            backgroundColor: string[];
        };
        render?: (props: DashboardCardProps['propiedades']) => React.ReactNode;
    }


export interface FormInputs {
    id?: string;
    nombre_usuario: string;
    username: string;
    password: string;
    confirm_password: string
    cedula: string;
    fecha_nacimiento: string;
    cargo: string;
    profesion: string;
    group_id: string;
    celular: string;
    telefono?: string;
}

export interface ModalRegistroProps {
    onClose: () => void;
    onAbort: () => void;
    usersTypes: UserType[] | null;
    userToEdit?: FormInputs | null;
    onSaved?: () => void;
}