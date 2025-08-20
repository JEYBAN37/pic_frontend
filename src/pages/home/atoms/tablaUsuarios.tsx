import React, { useEffect, useState } from 'react';
import type { UserType } from '../components/UserAdmin';
import ModalRegistro from './ModalRegistro';
import { AnimatePresence } from 'framer-motion';
import { getUserList } from '../logic/get';
import deleteUser from '../logic/delete';
import type { FormInputs } from '../data/data';

export interface UserList {
    id: string;
    username: string;
    nombre_usuario: string;
    email: string;
    group_id: string;
}


const TablaUsuarios: React.FC<{ usersTypes: UserType[] | null }> = ({ usersTypes }) => {
    const [searchText, setSearchText] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [userList, setUserList] = useState<any[]>([]); // <- aquí guardamos la lista del servidor
    const [loading, setLoading] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<FormInputs | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // <- para manejar la paginación



    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getUserList(searchText, selectedRole, page);

            const data = response.data;
            if (data && Array.isArray(data.users)) {
                const flattened = data.users.map((u: any) => ({
                    id: u.User.id,
                    username: u.User.username,
                    nombre_usuario: u.User.nombre_usuario.toLowerCase(),
                    email: u.User.email,
                    group_id: u.User.group_id,
                }));
                setUserList(flattened);
                setTotalPages(data.totalPages || 1); // <- actualiza total de páginas
                setPage(1); // Reinicia la página al buscar
            } else {
                setUserList([]);
            }
        } catch (error) {
            console.error("Error al buscar usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId: string, userName: string) => {
        if (!window.confirm(`¿Seguro que quieres eliminar a ${userName}?`)) return;
        const success = await deleteUser(userId, userName);
        if (success) {
            await fetchUsers();
        }
    };

    const handleEditUser = (userId: string) => {
        const user = userList.find(u => u.id === userId);
        if (user) {
            setSelectedUser(user);
            setShowEditModal(true);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchUsers();
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchText, selectedRole, page]); // <-- ahora también depende de la página


    // --- dentro de TablaUsuarios ---
    return (
        <>
            <div className="flex items-center justify-start gap-4 mb-4 pl-4">
                <input
                    type="text"
                    placeholder="Buscar usuario..."
                    className="border border-gray-300 rounded p-2 w-1/2"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />

                <select
                    name="role"
                    id="role"
                    className="border border-gray-300 rounded p-2 w-1/8"
                    value={selectedRole}
                    onChange={e => setSelectedRole(e.target.value)}
                >
                    <option value="">Todos</option>
                    {usersTypes?.map(userType => (
                        <option key={userType.id} value={userType.id}>
                            {userType.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="pl-4 pt-4">
                {renderUserTable(loading, userList, handleDeleteUser, handleEditUser, page, totalPages, setPage)}
            </div>

            {/* 👇 el modal lo manejás acá, no en renderUserTable */}
            <AnimatePresence>
                {showEditModal && selectedUser && (
                    <ModalRegistro
                        onClose={() => {
                            fetchUsers(); // refresca lista tras guardar
                            setShowEditModal(false);

                        }}
                        onSaved={fetchUsers}
                        onAbort={() => setShowEditModal(false)}
                        usersTypes={usersTypes}
                        userToEdit={selectedUser} // pasás el usuario a editar
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default TablaUsuarios;

function renderUserTable(
    loading: boolean,
    userList: any[],
    handleDeleteUser: (userId: string, userName: string) => void,
    handleEditUser: (userId: string) => void,
    page: number,
    totalPages: number, // <- asumiendo 10 usuarios por página
    setPage: React.Dispatch<React.SetStateAction<number>> = () => { } // <- para manejar la paginación
) {
    if (loading) return <p className="text-gray-500">Buscando...</p>;

    if (userList.length === 0) {
        return <p className="text-gray-500">No se encontraron usuarios</p>;
    }

    return (
        <div className="rounded-lg overflow-hidden">
            <div className="h-[200px] lg:h-[250px] 2xl:h-[250px] overflow-y-auto">
                <table className="min-w-full table-fixed">
                    <thead className="bg-gray-100 text-gray-800 sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold w-1/4">Nombre de Usuario</th>
                            <th className="px-6 py-3 text-left text-sm font-bold w-1/4">Username</th>
                            <th className="px-6 py-3 text-left text-sm font-bold w-1/4">Rol</th>
                            <th className="px-6 py-3 text-left text-sm font-bold w-1/4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                        {userList.map((user) => (
                            <UserRow
                                key={user.id}
                                user={user}
                                handleDeleteUser={handleDeleteUser}
                                handleEditUser={handleEditUser}
                            />
                        ))}
                    </tbody>
                </table>

                
            </div>
            <div className="flex justify-between items-center py-2">
                    <button
                        className="bg-blue-600 text-white px-2 py-2 rounded disabled:bg-gray-300 font-medium text-sm"
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        Anterior
                    </button>
                    <span>Página {page} de {totalPages}</span>
                    <button
                        className="bg-blue-600 text-white px-2 py-2 rounded disabled:bg-gray-300 font-medium text-sm"
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
        </div>
    );
}


interface UserRowProps {
    user: any;
    handleDeleteUser: (userId: string, userName: string) => void;
    handleEditUser: (userId: string) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, handleDeleteUser, handleEditUser }) => {
    let roleLabel = 'Operativo PIC';
    if (user.group_id === '1') roleLabel = 'Administrador';
    else if (user.group_id === '2') roleLabel = 'Referente';

    return (
        <tr className="hover:bg-gray-100 transition">
            <td className="px-6 py-2">{user.nombre_usuario}</td>
            <td className="px-6 py-2">{user.username}</td>
            <td className="px-6 py-2">{roleLabel}</td>
            <td className="px-6 py-2 ">
                <button
                    className="text-gray-800  hover:text-blue-600  mr-2 cursor-pointer"
                    onClick={() => handleEditUser(user.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-4 hover:scale-110">
                        <path  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>

                </button>
                <button
                    className="text-gray-800  hover:text-blue-600 cursor-pointer mx-4"
                    onClick={() => handleDeleteUser(user.id, user.nombre_usuario)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-4 hover:scale-110">
                        <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                </button>
            </td>
        </tr>
    );
};


