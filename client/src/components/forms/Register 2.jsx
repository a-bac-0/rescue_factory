import React, { useRef, useState, useEffect } from 'react'
import { registerUser } from '../../services/UsersServices'
import { useForm } from 'react-hook-form'
import { useUserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm()
    const { loginUser } = useUserContext()
    const navigate = useNavigate()

    const handleForm = async (data) => {
        console.log(data)
        try {
            const response = await registerUser(data)
            if (response.body.token) {
                console.log('Registro con éxito')
                loginUser(response.body.user)
                localStorage.setItem('token', response.body.token)
                navigate(0)
            }
        } catch (err) {
            console.log('Error de conexión')
        }
    }

    return (
        <section className="flex flex-col items-center bg-[#76816A] max-h-screen w-full min-w-s mx-auto">
            <div className="p-6 w-full max-w-md bg-[#e1d9b7] rounded-md shadow-lg mt-6">
                <h2 className="text-center text-2xl font-bold text-[#31442C] mb-6">
                    ¡Hazte Socio!
                </h2>
                <form onSubmit={handleSubmit(handleForm)} className="space-y-4">
                    <label htmlFor="firstName">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        autoComplete="off"
                        required
                        className="w-full px-4 py-2 border rounded focus:ring-2"
                        {...register('name', { required: true })}
                    />

                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        autoComplete="off"
                        required
                        className="w-full px-4 py-2 border rounded focus:ring-2"
                        {...register('email', { required: true })}
                    />
                    <label htmlFor="pwd">Contraseña:</label>
                    <input
                        type="mypassword"
                        id="pwd"
                        required
                        className="w-full px-4 py-2 border rounded focus:ring-2"
                        {...register('password', { required: true })}
                    />
                    <label htmlFor="confirm_pwd">Confirmar Contraseña:</label>
                    <input
                        type="confirm_password"
                        className="w-full px-4 py-2 border rounded focus:ring-2"
                    />
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" required className="rounded" />
                        <label>Declaro que soy mayor de 18 años. *</label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" required className="rounded" />
                        <label>
                            He leído y acepto la{' '}
                            <a href="privacypolicy" className="text-yellow-600">
                                Política de privacidad
                            </a>
                            . *
                        </label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <label>
                            Acepto recibir información por correo electrónico.
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-yellow-600 text-white font-bold rounded-md"
                    >
                        ENVIAR
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    ¿Ya eres miembro?{' '}
                    <a href="/login" className="text-yellow-600">
                        Inicia sesión
                    </a>
                </p>
            </div>
        </section>
    )
}
export default Register
