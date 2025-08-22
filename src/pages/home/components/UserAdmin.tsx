import React, { useEffect } from 'react';
import users from "../../../assets/personas.png";
import generales from "../../../assets/generales.png";
import referencia from "../../../assets/referencia.png";
import { getUserTypes } from '../logic/get';
import agregar from "../../../assets/agregar.png";
import { AnimatePresence } from "framer-motion";
import ModalRegistro from '../atoms/ModalRegistro';
import TablaUsuarios from '../atoms/tablaUsuarios';
import UploadUsers from '../atoms/UploadUsers';


export interface UserType {
    id: number;
    name: string;
    count: number;
    icon: string
}


const UserAdmin: React.FC = () => {
    const [usersTypes, setUsersTypes] = React.useState<
        UserType[]
    >([]);

    const [showModal, setShowModal] = React.useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModalSuccess = () => {
        setShowModal(false);
        alert("Usuario registrado exitosamente");
    };
    const handleCloseModal = () => {
        if (window.confirm("¿Seguro que quieres cerrar el registro? Los datos ingresados se perderán.")) {
            setShowModal(false);
        }
    }

    

    useEffect(() => {
        getUserTypes().then((data) => {
            if (data) {
                setUsersTypes([
                    {
                        id: 1,
                        name: "Administradores",
                        count: data.counts.grupo_1,
                        icon: users
                    },
                    {
                        id: 2,
                        name: "Referentes",
                        count: data.counts.grupo_2,
                        icon: referencia
                    },
                    {
                        id: 3,
                        name: "Operativos PIC",
                        count: data.counts.grupo_3,
                        icon: generales
                    },
                ]);

            }
        });


    }, []);



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

                    {usersTypes.map(userType => (
                        <div key={userType.id} className="space-y-4 ">

                            <div className="w-full h-[300px] 2xl:h-[200px] rounded-2xl  bg-white relative overflow-hidden shadow p-2  border border-gray-200 flex  justify-center items-center flex-row gap-4">

                                <img
                                    className="w-16 h-16 object-cover "
                                    alt="User Management Icon"
                                    src={userType.icon}
                                />
                                <div>
                                    <p className='text-4xl pt-4 font-bold'>{userType.count}</p>
                                    <h3 className="font-normal text-black text-lg pb-4">
                                        {userType.name}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Table de busqueda de usuarios */}
            <div className="w-full h-[500px] 2xl:h-[490px] rounded-2xl bg-white shadow p-4 border border-gray-200 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="mb-4 ml-4">
                        <h2 className="text-2xl font-semibold text-blue-600 ">Gestor de Usuarios</h2>
                        <p className="text-gray-600">Agrega, edita o elimina usuarios según sea necesario.</p>
                    </div>
                    <button
                        onClick={handleOpenModal}
                        className="flex bg-blue-600 text-white font-medium text-sm mr-10 p-4 py-2 rounded hover:bg-green-600 transition-colors cursor-pointer items-center">
                        <img src={agregar} alt="Agregar Usuario" className="mr-2 mt-1 w-4 h-4" />
                        <p>Agregar Usuario</p>
                    </button>
                </div>

                {/* Modal de registro */}
                <AnimatePresence>
                    {showModal && (
                        <ModalRegistro
                            onClose={handleCloseModalSuccess}
                            onAbort={handleCloseModal}
                            usersTypes={usersTypes}
                        />
                    )}
                </AnimatePresence>
                {/* Aquí puedes agregar un componente de búsqueda o tabla para mostrar los usuarios */}

                {/* Lista resultados */}
                <TablaUsuarios usersTypes={usersTypes}></TablaUsuarios>
            </div>

            {/* Table de busqueda de usuarios */}
            <div className="w-full h-[500px] 2xl:h-[490px] rounded-2xl bg-white shadow p-4 border border-gray-200 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="mb-4 ml-4">
                        <h2 className="text-2xl font-semibold text-blue-600 ">Agregador de Usuarios</h2>
                        <p className="text-gray-600">Agrega, usuarios de manera eficiente mediante .csv</p>
                    </div>
                </div>

                <UploadUsers userTypes={usersTypes} />
            </div>
        </>
    );
};

export default UserAdmin;