import React, { useState } from 'react';
import {loginUser} from '../../services/UsersServices';
import { useUserContext } from '../../context/UserContext';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const { setUser, setIsAuthenticated } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await loginUser(email, password);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setErrMsg(response.data.message || "Autenticación fallida");
      }
    } catch (err) {
      setErrMsg("Error de conexión");
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <h2 className="text-[#31442C] text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="bg-[#76816A] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {errMsg && <p className="text-red-600">{errMsg}</p>}
        <div className="mb-4">
          <label className="block text-[#31442C] text-sm font-bold mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#F5F5F5] shadow appearance-none border rounded w-full py-2 px-3 text-[#31442C] leading-tight focus:outline-none focus:shadow-outline"
            placeholder="email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#31442C] text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#F5F5F5] shadow appearance-none border rounded w-full py-2 px-3 text-[#31442C] leading-tight focus:outline-none focus:shadow-outline"
            placeholder="password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-[#D1B85E] hover:bg-[#FFD94F] text-[#31442C] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
