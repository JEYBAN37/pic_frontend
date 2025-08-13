import logo from "../../../assets/sjpasto.svg";
import ciudadBienestarLogo from "../../../assets/bienestar.svg";
import resumenPicA from "../../../assets/introduccionA.svg";
import resumenPicB from "../../../assets/introduccionB.svg";
import resumenPicC from "../../../assets/introduccionC.svg";
import resumenPicD from "../../../assets/introduccionD.svg";
import { SlidesList, type SlideData } from "../atoms/Slides";
import mapaSectores from "../../../assets/mapaSectores.svg";
import rom from "../../../assets/rom.svg";
import indigenas from "../../../assets/indigenas.svg";
import habitantes from "../../../assets/habitantes.svg";
import discapacitados from "../../../assets/discapacitados.svg";
import victimas from "../../../assets/victimas.svg";
import educacion from "../../../assets/educacion.svg";
import informacion from "../../../assets/informacion.svg";
import conformacion from "../../../assets/conformacion.svg";
import dispositivos from "../../../assets/colegio.svg";
import email from '../../../assets/email.svg';
import phone from '../../../assets/cell.svg';
import ubicacion from '../../../assets/ubicacion.svg';
import facebook from "../../../assets/facebook.png";
import instagram from "../../../assets/instagram.png";




export const ItemsNavbarArray: string[] = [
  "Inicio",
  "Introduccion",
  "Resultados",
  "Poblaciones",
];

export const ItemsNavbar = {
  subtitle: "Ciudad Bienestar",
  items: ItemsNavbarArray,
  logoPasto: {
    src: logo,
    alt: "Logo de San Juan de Pasto",
    href: "https://www.saludpasto.gov.co/",
  },
  ciudadBienestar: {
    src: ciudadBienestarLogo,
    alt: "Ciudad Bienestar Logo",
    href: "https://www.pasto.gov.co/index.php/noticias-salud/15867-alcaldia-de-pasto-celebrara-los-10-anos-de-ciudad-bienestar-una-decada-comprometida-con-la-salud-desde-todos-los-derechos"
  },
};

export interface ResultadoStructure {
  title: string;
  subtitle: string;
  text: string;
  paragraph: string;
  img: string;
  slidesData: SlideData[];
}

export const Resultado: ResultadoStructure = {
  title: "Resultados",
  subtitle: "Resultados Generales PIC 2025",
  text: "Cobertura por Género y Curso de Vida",
  paragraph:"La participación destaca un liderazgo femenino fuerte, con la mayoría de beneficiarios mujeres. El mayor número se concentra en juventud y adultez, mostrando un enfoque en grupos con mayor potencial de impacto social.",
  img: mapaSectores,
  slidesData: [
    {
      title: "Participantes alcanzados",
      text: "{countParticipantes}",
    },
    {
      title: "Actividades PIC desarrolladas",
      text: "{countActividades}",
    },
  ],
};

export const slidesData: SlideData[] = [
  {
    title: "Antecedentes",
    text: "Para Pasto el Plan de Salud Publica de Intervenciones Colectivas PIC ha construido su propia identidad que se ha mantenido en los últimos 10 años y se ha denominado Estrategia Ciudad Bienestar",
  },
  {
    title: "Resumen del PIC",
    text: 'El Plan de Intervenciones Colectivas "Ciudad Bienestar" busca mejorar el bienestar de la personas y comunidades mediante acciones de promoción de la salud a través de procesos pedagógicos.',
  },

];


export const slidesData2: SlideData[] = [
  {
    title: "Marco Normativo",
    text:
      "• Resolución 518 de 2015 y 295 de 2023\n" +
      "• Resolución 3280 de 2018\n" +
      "• Leer Resolución 518 - Leer Resolución 295  Leer Resolución 3280\n",
  },
  {
    title: "Principales acciones",
    text: [
      "• Atención Primaria en Salud\n" +
        "• Educación e información para la salud\n" +
        "• Fortalecimiento de redes comunitarias\n" +
        "• Tamizajes en salud, Dispositivos comunitario",
    ].join("\n"),
  }
];

export const slidesData3: SlideData[] = [
  {
    title: "Problemáticas Prioritarias en el PIC Ciudad Bienestar",
    text: [
      "\n",
      "• **Nutrición y estado laboral:** Bajo peso y condiciones en entornos comunitarios y laborales.\n",
      "• **Salud mental y conductas:** Violencia, suicidio y consumo de sustancias psicoactivas.\n",
      "• **Salud sexual y reproductiva:** Mortalidad materna y perinatal alarmantes.\n",
      "• **Participación social:** Vigilancia sanitaria en ámbitos laborales y comunitarios.\n",
    ].join("\n"),
  },
];

export const slidesData4: SlideData[] = [
   {
    title: "Cobertura Poblaciones especiales",
    text: [
      "Incluye la participación de población indígena, ROM, afrodescendientes, grupos especiales como víctimas del conflicto armado, personas con discapacidad, migrantes, habitante en calle generado espacios propicios con las adecuaciones pertinentes.",
    ].join("\n"),
  },
  {
    title: "Cobertura Geográfica",
    text: "Intervenciones se han focalizado en la comunas y corregimientos del municipio de Pasto, ampliando el alcance a poblaciones urbanas y rurales.",
  },

];

export const ItemsLogin = {
  title: "Sistema de Información",
  subtitle: "Ciudad Bienestar",
  welcomeMessage: "Bienvenido a PIC 2025",
  pic: "PIC ",
  mensage:
    'El Plan de Intervenciones Colectivas "Ciudad Bienestar" busca mejorar el bienestar de la personas y comunidades mediante acciones de promoción de la salud a través de procesos pedagógicos. para ingresar al sistema, por favor inicia sesión.',
  introduccion: "Introducción",
  detail: "¿Qué es el plan de Intervenciones Colectivas Ciudad Bienestar?",
};

export interface ItemsCarrusel {
  title: string;
  img: string;
  component?: React.ElementType;
  props?: Record<string, any>;
}

export const IntroduccionPIC = [
  {
    title: "Antecedentes",
    img: resumenPicA,
    component: SlidesList,
    props: { slides: slidesData },
  },
  {
    title: "Resumen del PIC",
    img: resumenPicB,
    component: SlidesList,
    props: { slides: slidesData2 },
  },
  {
    title: "Problemáticas Prioritarias en el PIC Ciudad Bienestar",
    img: resumenPicC,
    component: SlidesList,
    props: { slides: slidesData3 },
  },

  {
    title: "Cobertura Geográfica",
    img: resumenPicD,
    component: SlidesList,
    props: { slides: slidesData4 },
  },
];

 export const SliderItemsPoblaciones = [
    {
      title: "Indígenas",
      text: "246 personas participantes en acciones de educación e información den salud con acciones de enfoque diferencial",
      img: indigenas
    },
    {
      title: "ROM",
      text: "Estrategias de inclusión para el reconocimiento de la cultura ROM y acceso a servicios de salud con enfoque diferencial",
      img: rom
    },
    {
      title: "Víctimas",
      text: "936 participantes en acciones de educación e información en  salud, acciones psicosociales mediante actividades de fortalecimiento de redes.",
      img: victimas
    },
        {
      title: "Discapacidad",
      text: "1.034 personas con discapacidad participaron en actividades de educación e información en salud, fortalecimiento de redes comunitarias y dispositivos comunitarios.",
      img: discapacitados
    },
    {
      title: "Habitantes de Calle",
      text: "117 personas en situación de calle con acciones de educación e información, participación evento \"Pies en la Calle Corazón en el Cielo\"",
      img: habitantes
    },
  ]


 export const SliderItemsTecnologias = [
    {
      title: "Educación para la salud",
      text: "246 personas participantes en acciones de educación e información den salud con acciones de enfoque diferencial",
      img: educacion
    },
    {
      title: "Información en salud y jornadas",
      text: "Estrategias de inclusión para el reconocimiento de la cultura ROM y acceso a servicios de salud con enfoque diferencial",
      img: informacion
    },
    {
      title: "Conformación y fortalecimiento",
      text: "936 participantes en acciones de educación e información en  salud, acciones psicosociales mediante actividades de fortalecimiento de redes.",
      img: conformacion
    },
        {
      title: "Dispositivos comunitarios",
      text: "1.034 personas con discapacidad participaron en actividades de educación e información en salud, fortalecimiento de redes comunitarias y dispositivos comunitarios.",
      img: dispositivos
    },
  ]

  export interface FooterDataStructure {
  title: string;
  img: string;
  ref: string;
  imgLogo: string;
  refLogo: string;
  text: string;
  titleContact: string;
  contact: {
    text: string;
    img: string;
    ref: string;
  }[];
  redes: {
    text: string;
    img: string;
    ref: string;
  }[];
}

export const FooterData : FooterDataStructure = {
        title: "Sistema de Informacion PIC",
        img: ciudadBienestarLogo,
        imgLogo: logo,
        ref: ItemsNavbar.ciudadBienestar.href,
        refLogo: ItemsNavbar.logoPasto.href,
        text: "Para consultas y participación, contáctanos a través de los siguientes medios:",
        titleContact: "Contacto",
        contact: [
            {
                text: "**Email**: contacto@pic.com",
                img: email,
                ref: "mailto:contacto@pic.com.com?subject=Consulta&body=Hola,%20me%20gustaría%20contactarlos."
            },
            {
                text: "**Teléfono**: +123 456 7890",
                img: phone,
                ref: "tel:+1234567890"
            },
            {
                text: "**Dirección**: Calle Falsa 123",
                img: ubicacion,
                ref: "https://www.google.com/maps?q=Calle+Falsa+123"
            }
        ],
        redes:[
            {
                text: "Facebook",
                img: facebook,
                ref: "https://www.facebook.com/ciudadbienestar"
            },
            {
                text: "Instagram",
                img: instagram,
                ref: "https://www.instagram.com/ciudadbienestar"
            }
        ]

    }
