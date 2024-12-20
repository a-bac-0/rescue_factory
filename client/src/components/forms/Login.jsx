import React, { useState } from 'react'
import { loginUser } from '../../services/UsersServices'
import { useUserContext } from '../../context/UserContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const { setUser, setIsAuthenticated } = useUserContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await loginUser(email, password)

            if (response.data.success) {
                localStorage.setItem('token', response.data.token)
                console.log('Este es el token' + token)
                setUser(response.data.user)
                setIsAuthenticated(true)
            } else {
                setErrMsg(response.data.message || 'Autenticación fallida')
            }
        } catch (err) {
            setErrMsg('Error de conexión')
        }
    }

    return (
        <div className="w-full max-w-xs mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">
                Iniciar Sesión
            </h2>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Correo Electrónico"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Contraseña"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
