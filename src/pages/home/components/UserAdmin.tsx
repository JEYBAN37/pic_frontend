import React from 'react';
import users from "../../../assets/personas.png";
import generales from "../../../assets/generales.png";
import referencia from "../../../assets/referencia.png";

const UserAdmin: React.FC = () => {
    return (
        <>
            <div className="mb-8">
                <h1 className="font-bold text-[#155dfc] text-2xl md:text-3xl lg:text-4xl  mb-2">
                    Panel de Administración
                </h1>
                <div className="font-semibold text-gray-600 text-sm md:text-[15px] ">
                    Aquí puedes gestionar los usuarios, roles y permisos del sistema.
                </div>
            </div>

            <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="space-y-4 ">

                        <div className="w-full h-[300px] 2xl:h-[200px] rounded-2xl  bg-white relative overflow-hidden shadow p-2  border border-gray-200 flex  justify-center items-center flex-row gap-4">

                            <img
                                className="w-16 h-16 object-cover "
                                alt="User Management Icon"
                                src={users}
                            />
                            <div>
                                <p className='text-4xl pt-4 font-bold'>151</p>
                                <h3 className="font-normal text-black text-lg pb-4">
                                    Usuarios
                                </h3>
                            </div>
                        </div>
                    </div>

                     <div className="space-y-4 ">

                        <div className="w-full h-[300px] 2xl:h-[200px] rounded-2xl  bg-white relative overflow-hidden shadow p-2  border border-gray-200 flex  justify-center items-center flex-row gap-4">

                            <img
                                className="w-16 h-16 object-cover "
                                alt="User Management Icon"
                                src={generales}
                            />
                            <div>
                                <p className='text-4xl pt-4 font-bold'>130</p>
                                <h3 className="font-normal text-black text-lg pb-4">
                                    Operativos PIC
                                </h3>
                            </div>
                        </div>
                    </div>

                     <div className="space-y-4 ">

                        <div className="w-full h-[300px] 2xl:h-[200px] rounded-2xl  bg-white relative overflow-hidden shadow p-2  border border-gray-200 flex  justify-center items-center flex-row gap-4">

                            <img
                                className="w-16 h-16 object-cover "
                                alt="User Management Icon"
                                src={referencia}
                            />
                            <div>
                                <p className='text-4xl pt-4 font-bold'>20</p>
                                <h3 className="font-normal text-black text-lg pb-4">
                                    Referentes
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>


           
        </>
    );
};

export default UserAdmin;