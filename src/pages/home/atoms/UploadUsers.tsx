import React, { useState } from 'react';
import { ArchiveRestore, ArrowUpFromLine } from "lucide-react";
import type { UserType } from '../components/UserAdmin';
import { useAlert } from '../../login/components/FormLogin';
import { cakePostRequest } from '../logic/post';

const UploadUsers: React.FC<{ userTypes: UserType[] }> = ({ userTypes }) => {

    const [jsonData, setJsonData] = useState<any[]>([]);
    const [infoUpload, setInfoUpload] = useState<any[]>([]);
    const { showAlert } = useAlert();


    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            const json = csvToJson(text);
            setJsonData(json);
        };
        reader.readAsText(file);
    };

    // Función para convertir CSV a JSON
    const csvToJson = (csv: string) => {
        const lines = csv.split("\n").map(line => line.trim()).filter(line => line !== "");
        const headers = lines[0].split(",");

        return lines.slice(1).map(line => {
            const values = line.split(",");
            const obj: any = {};
            headers.forEach((header, i) => {
                obj[header.trim()] = values[i]?.trim();
            });
            return obj;
        });
    };


    const getGroupName = (value: unknown) => {
        const found = userTypes.find(u => String(u.id) === String(value));
        return found ? found.name : value;
    };

    const uploadUsers = async () => {
        if (jsonData.length === 0) {
            showAlert("No hay datos para cargar");
            return;
        }

        setInfoUpload([]); // 🔥 limpia el log anterior

        for (const user of jsonData) {
            const response = await cakePostRequest(user, '/users/add', showAlert);

            if (response?.success) {
                setInfoUpload(prev => [...prev, `✅ Usuario ${user.username || user.email} cargado correctamente`]);
            } else {
                setInfoUpload(prev => [...prev, `❌ Error al cargar ${user.username || user.email}: ${response?.message || 'Error desconocido'}`]);
            }
        }
    };


    return (
        <div className="flex flex-1 min-h-0 gap-4">
            <div className="basis-1/3 px-4 flex flex-col">
                <label
                    className="relative w-full mb-5 h-52 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                    onDragOver={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.classList.add("bg-gray-100");
                    }}
                    onDragLeave={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.classList.remove("bg-gray-100");
                    }}
                    onDrop={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.currentTarget.classList.remove("bg-gray-100");
                        const file = e.dataTransfer.files?.[0];
                        if (file && file.type === "text/csv") {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                const text = event.target?.result as string;
                                const json = csvToJson(text);
                                setJsonData(json);
                            };
                            reader.readAsText(file);
                        }
                    }}
                >
                    <input
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                    />
                    <ArchiveRestore className="w-12 h-12 text-gray-600" aria-label="Subir CSV" />
                    <span className="absolute bottom-4 left-0 right-0 text-center text-gray-500 text-xs">
                        Arrastra o selecciona un archivo .csv
                    </span>
                </label>
                <div className='h-48 py-2 border mb-4 border-gray-300 rounded-md overflow-auto'>
                    {infoUpload.length > 0 && (
                        <ul className='pl-4 text-sm text-gray-700'>
                            {infoUpload.map((info, index) => (
                                <li
                                    key={index}
                                    className={
                                        info.toLowerCase().includes('cargado correctamente')
                                            ? 'text-green-800'
                                            : 'text-red-600'
                                    }
                                >
                                    {info}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <button
                        onClick={uploadUsers}
                        className='flex items-center  py-2 px-4 bg-green-600 text-white hover:bg-green-700 transition-colors rounded-md cursor-pointer font-semibold'>
                        <ArrowUpFromLine className="w-8 h-5 pr-2 text-white" />
                        Cargar usuarios
                    </button>
                </div>
            </div>

            <div className="basis-2/3 flex flex-col overflow-auto rounded-xl ">
                <table className=" rounded-xl">
                    <thead>
                        <tr className='bg-gray-100 rounded-xl'>
                            {jsonData.length > 0 && (
                                <th className="px-2 py-1 border-b font-semibold text-sm text-black border-gray-300">Eliminar</th>
                            )}
                            {jsonData.length > 0 &&
                                Object.keys(jsonData[0]).map((header) => (
                                    <th key={header} className="px-2 py-1 border-b font-semibold text-center text-sm text-black border-gray-300">
                                        {header}
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {jsonData.map((row, idx) => (
                            <tr key={idx}>
                                <td className="px-2 py-1 border-b border-gray-300">


                                    <button
                                        className="text-gray-800  hover:text-blue-600 cursor-pointer mx-4"
                                        onClick={() => {
                                            setJsonData(prev => prev.filter((_, i) => i !== idx));
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-4 hover:scale-</svg>110">
                                            <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>

                                    </button>
                                </td>
                                {Object.entries(row).map(([key, value], i) => (
                                    <td key={i} className="px-2 py-1 border-b border-gray-300 text-xs font-light">
                                        {key === "group_id"
                                            ? String(getGroupName(value))
                                            : String(value)}
                                    </td>
                                ))}

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default UploadUsers;