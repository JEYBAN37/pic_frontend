import { useForm, type SubmitHandler } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SendCacketoServer } from '../logic/post';
import { AlertComponent } from '../atoms/AlertComponent';
import ReCAPTCHA from 'react-google-recaptcha';
const siteKey = '6Lc_cZ4rAAAAACJd0UxVcpOwGo4tOwM0SNASrcGW';

export interface LoginFormInputs {
    username: string;
    password: string;
}

export const titles = {
    username: "Usuario",
    password: "Contraseña"
}


// Custom hook to manage alert state
export const useAlert = () => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const showAlert = (message: string) => setAlertMessage(message);
    const hideAlert = () => setAlertMessage(null);
    return { alertMessage, showAlert, hideAlert };
};

const FormLogin: React.FC = () => {
    const navigate = useNavigate();
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const { register, formState: { errors }, handleSubmit } = useForm<LoginFormInputs>();
    const { alertMessage, showAlert, hideAlert } = useAlert();

    const onSubmit: SubmitHandler<LoginFormInputs> = data => {
        if (!captchaToken) {
            alert("Por favor verifica el reCAPTCHA.");
            return;
        }
        hideAlert();
        SendCacketoServer(data, navigate, '/users/login', null, showAlert, "POST");
    };



    return (
        <form
            className='flex flex-col w-[350px] h-[510px] md:w-[450px]  bg-white rounded-2xl border border-gray-300 shadow-2xl'
            onSubmit={handleSubmit(onSubmit)}>
            {alertMessage && <AlertComponent message={alertMessage} />}

            <h2 className='text-blue-600 text-center text-2xl font-bold pt-6 pb-1'>Iniciar Sesión</h2>
            <h2 className='text-gray-400 text-center text-sm font-sans pt-1 '>Accede a tu panel de control PIC</h2>

            <div className='flex flex-col gap-1 px-6 pt-6'>
                <label className='text-black text-sm font-semibold'>{titles.username}</label>
                <input
                    className='w-full border pl-2 text-black border-gray-300 rounded h-9 focus:outline-none focus:border-blue-500 focus:shadow-lg'
                    {...register("username", { required: true })}
                    aria-invalid={errors.username ? "true" : "false"}
                />
                {errors.username?.type === "required" && <AlertComponent message="Este campo es obligatorio" />}
            </div>
            <div className='flex flex-col gap-1 px-6 pt-4'>
                <label className='text-black text-sm font-semibold'>{titles.password}</label>
                <input
                    className='w-full border pl-2 text-black border-gray-300 rounded h-9 focus:outline-none focus:border-blue-500 focus:shadow-lg'
                    type="password"
                    {...register("password", { required: true })}
                    aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password?.type === "required" && <AlertComponent message="Este campo es obligatorio" />}
            </div>
            <ReCAPTCHA className='px-6 pb-4 pt-6' sitekey={siteKey} onChange={setCaptchaToken} />
            <div className='flex  justify-between px-6 p-2'>
                <a href="/" className='text-blue-500 text-sm font-semibold hover:underline'>¿Olvidaste tu contraseña?</a>
            </div>



            <button className='bg-green-600 text-white rounded h-10 mt-2 mx-6 hover:bg-blue-900 cursor-pointer text-md font-normal mb-4' type="submit">Entrar</button>
        </form>

    );
};

export default FormLogin;