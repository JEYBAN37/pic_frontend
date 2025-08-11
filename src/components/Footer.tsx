import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { FooterDataStructure } from '../data/data';

const Footer: React.FC<FooterDataStructure> = ( footerData : FooterDataStructure) => {


    return (
        <footer  id="Contacto" className="flex flex-col items-center justify-center bg-white py-6">
            <div className='w-full flex flex-row justify-between'>
                <div className='flex flex-col items-start justify-center'>
                    <h2 className="text-2xl font-bold text-gray-400 px-10 py-2">{footerData.title}</h2>
                    <h3 className="text-xl font-bold text-gray-400 px-10 py-2">{footerData.titleContact}</h3>
                    <p className="text-gray-500 px-10 text-sm py-2">{footerData.text}</p>
                    <div className="list-disc pl-10 text-gray-500">
                        {footerData.contact.map((item) => (
                            <div key={item.text} className="flex items-center">
                                <img src={item.img} alt="" className='w-4 mx-2' />
                                <a href={item.ref} className="text-sm hover:text-blue-500"><ReactMarkdown>{item.text}</ReactMarkdown></a>
                            </div>

                        ))}
                    </div>
                      <a href={footerData.ref}><img src={footerData.img} alt={footerData.text} className='w-30 mx-10 mt-4' /></a>
                    <div>

                    </div>

                </div>

                <div className='flex flex-col items-end justify-start'>
                    <div className='text-xl font-bold text-gray-400 px-10 text-end'>Siguenos</div>
                    <div className='flex space-x-4 px-10 py-2'>
                        {footerData.redes.map((item) => (
                            <a key={item.text} href={item.ref} className="flex items-center justify-center">
                                <img src={item.img} alt="" className='w-10 hover:scale-110 transition-transform duration-200' />
                            </a>
                        ))}
                    </div>
                   <a href={footerData.refLogo}> <img src={footerData.imgLogo} alt={footerData.text} className='w-40 mx-10 mt-2' /></a> 
                </div>

            </div>
            <div className='w-[95%] border my-4 border-gray-300'>
            </div>
            <p className="text-gray-500 text-sm ">© 2025 PIC. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;