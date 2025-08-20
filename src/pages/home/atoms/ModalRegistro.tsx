import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useAlert } from '../../login/components/FormLogin';
import { SendCacketoServer } from '../../login/logic/post';
import { AlertComponent } from '../../login/atoms/AlertComponent';
import { type FormInputs, type ModalRegistroProps } from '../data/data';
import { getOneUser } from '../logic/get';


const ModalRegistro: React.FC<ModalRegistroProps> = ({ onClose, onAbort, usersTypes, userToEdit, onSaved }) => {

    const { register, formState: { errors }, handleSubmit, watch, reset } = useForm<FormInputs>({
        defaultValues: userToEdit ?? {} // <--- precarga valores si hay usuario
    });

    const password = watch("password", "");
    const { alertMessage, showAlert, hideAlert } = useAlert();


    const onSubmit: SubmitHandler<FormInputs> = async data => {
        hideAlert();
        const payload = { ...data, nombre_usuario: data.nombre_usuario.toUpperCase() };

        const isEdit = Boolean(userToEdit);
        const url = isEdit ? `/users/edit/${userToEdit!.id}` : '/users/add';
        const method = isEdit ? 'PUT' : 'POST';

        await SendCacketoServer(payload, null, url, null, showAlert, method);
        if (isEdit) {
            onSaved?.();
        }
        onClose();
    };

    async function fetchUserData(id: string) {
        await getOneUser(id, reset, showAlert);
    }


    // 🔹 Este se ejecuta cuando cambia el userToEdit (abrir modal por ejemplo)
    useEffect(() => {
        if (userToEdit?.id) {
            // Carga desde API
            fetchUserData(userToEdit.id);
        } else if (userToEdit) {
            // Si ya tienes data local
            reset(userToEdit);
        }
    }, [userToEdit]);


    return (
        <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                key="modal"
                className="flex flex-col w-[350px] h-[555px] md:w-[800px]  bg-white rounded-2xl border border-gray-300 shadow-2xl relative"
                initial={{ scale: 0.9, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >


                <button
                    className="absolute top-2 right-6 text-gray-500 hover:text-blue-600 text-3xl cursor-pointer"
                    onClick={onAbort}
                >
                    &times;
                </button>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6 p-10  overflow-auto">
                    <div className="col-span-2 w-full">
                        <h2 className='text-blue-600 text-center text-2xl font-bold pt-6 pb-1'>   {userToEdit ? "Editar Usuario" : "Registrar Usuario"}</h2>
                        <h2 className='text-gray-400 text-center text-sm font-sans pt-1 '> {userToEdit ? "Modifica los datos del usuario" : "Ingresa los datos del nuevo usuario"}</h2>
                    </div>
                    <div className='col-span-2 w-full'>
                        <label htmlFor="nombre_usuario" className='text-black text-sm font-semibold'>Nombre Completo </label>
                        <input
                            id="nombre_usuario"
                            className='w-full border pl-2 text-black border-gray-300 rounded h-9 focus:outline-none focus:border-blue-500 focus:shadow-lg'
                            {...register("nombre_usuario", { required: true })}
                            aria-invalid={errors.nombre_usuario ? "true" : "false"}
                        />
                        {errors.nombre_usuario?.type === "required" && <AlertComponent message="Este campo es obligatorio" />}
                    </div>

                    <div>
                        <label htmlFor="password" className='text-black text-sm font-semibold'>Contraseña</label>
                        <input
                            id="password"
                            className='w-full border pl-2 text-black border-gray-300 rounded h-9 focus:outline-none focus:border-blue-500 focus:shadow-lg'
                            {...register("password", {
                                required: !userToEdit ? "Este campo es obligatorio" : false,
                                minLength: {
                                    value: 7,
                                    message: "La contraseña debe tener al menos 7 caracteres"
                                },
                                validate: value =>
                                    value === "" && userToEdit
                                        ? true
                                        : /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                                        "La contraseña debe contener al menos un carácter especial"
                            })}
                            aria-invalid={errors.password ? "true" : "false"}
                            type="password"
                        />
                        {errors.password?.type === "required" && <AlertComponent message={errors.password.message ?? ""} />}
                        {errors.password?.type === "minLength" && <AlertComponent message={errors.password.message ?? ""} />}
                        {errors.password?.type === "validate" && <AlertComponent message={errors.password.message ?? ""} />}
                    </div>

                    <div>
                        <label htmlFor="confirm_password" className='text-black text-sm font-semibold'>Confirmar Contraseña</label>
                        <input
                            id="confirm_password"
                            type="password"
                            className='w-full border pl-2 text-black border-gray-300 rounded h-9 focus:outline-none focus:border-blue-500 focus:shadow-lg'
                            {...register("confirm_password", {
                                required: !userToEdit ? "Este campo es obligatorio" : false,
                                validate: (value) =>
                                    (userToEdit && password === "") || value === password || "Las contraseñas no coinciden"
                            })}
                            aria-invalid={errors.confirm_password ? "true" : "false"}
                        />
                        {errors.confirm_password && <AlertComponent message={errors.confirm_password.message ?? ""} />}
                    </div>

                    <div>
                        <label htmlFor="cedula" className='text-black text-sm font-semibold'>Numero de Cedula </label>
                        <input
                            id="cedula"
                            className='w-full border pl-2 text-black border-gray-300 rounded h-9 focus:outline-none focus:border-blue-500 focus:shadow-lg'
                            {...register("cedula", { required: true })}
                            aria-invalid={errors.cedula ? "true" : "false"}
                        />
                        {errors.cedula?.type === "required" && <AlertComponent message="Este campo es obligatorio" />}
                    </div>


                    <div>
                        <label htmlFor="fecha_nacimiento" className='text-black text-sm font-semibold'>Fecha de Nacimiento </label>
                        <input
                            id="fecha_nacimiento"
                            className='w-full border pl-2 text-black border-gray-300 rounded h-9 focus:outline-none focus:border-blue-500 focus:shadow-lg'
                            type="date"
                            {...register("fecha_nacimiento", {
                                required: true,
                                validate: value => {
                                    const selectedDate = new Date(value);
                                    const today = new Date();
                                    if (selectedDate > today) {
                                        return "La fecha de nacimiento no puede ser en el futuro";
                                    }
                                    return true;
                                }
                            })}
                            aria-invalid={errors.fecha_nacimiento ? "true" : "false"}
                        />
                        {errors.fecha_nacimiento?.type === "required" && <AlertComponent message="Este campo es obligatorio" />}
                        {errors.fecha_nacimiento?.type === "validate" && <AlertComponent message={errors.fecha_nacimiento.message ?? ""} />}
                    </div>

                    <div>
                        <label htmlFor="cargo" className='text-black text-sm font-semibold'>Cargo </label>
                        <input
                            id="cargo"
                            className='w-full border pl-2 text-black border-gray-300 rounded h-9 focus:outline-none focus:border-blue-500 focus:shadow-lg'
                            {...register("cargo", {
                                required: true,
                                pattern: {
                                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s.,\-()]+$/,
                                    message: "Solo se permiten letras y caracteres especiales básicos"
                                }
                            })}
                            aria-invalid={errors.cargo ? "true" : "false"}
                        />
                        {errors.cargo?.type === "required" && <AlertComponent message="Este campo es obligatorio" />}
                        {errors.cargo?.type === "pattern" && <AlertComponent message={errors.cargo.message ?? ""} />}
                    </div>
                    <div>
                        <label htmlFor="profesion" className='text-black text-sm font-semibold'>Profesion</label>
                        <input
                            id="profesion"
                            className='w-full border pl-2 text-black border-gray-300 rounded h-9 focus:outline-none focus:border-blue-500 focus:shadow-lg'
                            {...register("profesion", {
                                pattern: {
                                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s.,\-()]+$/,
                                    message: "Solo se permiten letras"
                                }
                            })}
                            aria-invalid={errors.profesion ? "true" : "false"}
                        />
                        {errors.profesion?.type === "required" && <AlertComponent message="Este campo es obligatorio" />}
                        {errors.profesion?.type === "pattern" && <AlertComponent message={errors.profesion.message ?? ""} />}
                    </div>


                    <div className='flex flex-col gap-1 col-span-2 w-full'>
                        <label htmlFor='tipo_usuario' className='text-black text-sm font-semibold'>Tipo de Usuario</label>
                        <select
                            id="tipo_usuario"
                            className='w-[48%] border pl-2 text-black border-gray-300 rounded h-9 focus:outline-none focus:border-blue-500 focus:shadow-lg'
                            {...register("group_id", { required: true })}
                            aria-invalid={errors.group_id ? "true" : "false"}
                        >
                            <option value="">Seleccionar tipo de usuario</option>
                            {usersTypes?.map(userType => (
                                <option key={userType.id} value={userType.id}>
                                    {userType.name}
                                </option>
                            ))}
                        </select>
                        {errors.group_id?.type === "required" && <AlertComponent message="Este campo es obligatorio" />}
                    </div>


                    <h2 className='col-span-2 w-full text-blue-600 text-xl font-semibold'>Informacion de Contacto</h2>

                    <div>
                        <label htmlFor="correo" className='text-black text-sm font-semibold'>Correo Electronico - Usuario PIC</label>
                        <input
                            id="correo"
                            className='w-full border pl-2 text-black border-gray-300 rounded h-9 focus:outline-none focus:border-blue-500 focus:shadow-lg'
                            type="email"
                            {...register("username", {
                                required: true,
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Formato de correo inválido"
                                }
                            })}
                            aria-invalid={errors.username ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && <AlertComponent message="Este campo es obligatorio" />}
                        {errors.username?.type === "pattern" && <AlertComponent message={errors.username.message ?? ""} />}
                    </div>


                    <div>
                        <label htmlFor="celular" className='text-black text-sm font-semibold'>Celular</label>
                        <input
                            id="celular"
                            className='w-full border pl-2 text-black border-gray-300 rounded h-9 focus:outline-none focus:border-blue-500 focus:shadow-lg'
                            type="tel"
                            {...register("celular", {
                                required: true,
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: "El número de celular debe tener 10 dígitos"
                                }
                            })}
                            aria-invalid={errors.celular ? "true" : "false"}
                        />
                        {errors.celular?.type === "required" && <AlertComponent message="Este campo es obligatorio" />}
                        {errors.celular?.type === "pattern" && <AlertComponent message={errors.celular.message ?? ""} />}
                    </div>


                    <div>
                        <label htmlFor="telefono" className='text-black text-sm font-semibold'>Telefono</label>
                        <input
                            className='w-full border pl-2 text-black border-gray-300 rounded h-9 focus:outline-none focus:border-blue-500 focus:shadow-lg'
                            {...register("telefono", {
                                pattern: {
                                    value: /^\d{7,10}$/,
                                    message: "El número de teléfono debe tener entre 7 y 10 dígitos"
                                }
                            })}
                            aria-invalid={errors.telefono ? "true" : "false"}
                            defaultValue="0000000000"
                        />
                        {errors.telefono?.type === "pattern" && <AlertComponent message={errors.telefono.message ?? ""} />}
                    </div>

                    <div className='col-span-2 w-full flex justify-end'>
                        <button className='bg-green-600 text-white rounded h-10 mt-2  w-40 hover:bg-blue-900 cursor-pointer text-md font-semibold mb-4' type="submit">{userToEdit ? "Actualizar" : "Registrar"}</button>
                    </div>
                    {alertMessage && <AlertComponent message={alertMessage} />}

                </form>
            </motion.div>
        </motion.div>
    );
};

export default ModalRegistro;