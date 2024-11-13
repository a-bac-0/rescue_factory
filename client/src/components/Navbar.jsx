import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useUserContext } from '../context/UserContext';
import LoginForm from './forms/Login';
import Registro from './forms/Registro';
import LogoutButton from './LogOutButton';

const Navbar = () => {
  const { user, isAuthenticated } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLogin = () => setShowLogin(!showLogin);
  const toggleRegistro = () => setShowRegistro(!showRegistro);

  return (
    <header className="bg-[#D1B85E] w-full fixed top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center mr-8">
          <Link to="/">
            <img src={logo} alt="Rescue Factory Logo" className="h-10" />
          </Link>
        </div>
        <div className="hidden sm:flex sm:justify-center sm:items-center w-full">
          <div className="flex items-center space-x-8 text-[#31442C] font-bold text-lg">
            {["Home", "Noticias", "Contacto", "Adopciones"].map((item, idx) => (
              <Link
                key={idx}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="transition-transform duration-200 ease-in-out hover:underline hover:scale-105 origin-center"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="ml-auto flex items-center space-x-4 pl-8">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={toggleLogin}
                  className="px-4 py-2 text-[#D1B85E] bg-[#31442C] rounded-lg hover:bg-[#4c5b4a]"
                >
                  Login
                </button>
                <button
                  onClick={toggleRegistro}
                  className="px-4 py-2 text-[#D1B85E] bg-[#31442C] rounded-lg hover:bg-[#4c5b4a]"
                >
                  Registro
                </button>
              </>
            ) : (
              <LogoutButton />
            )}
          </div>
        </div>
        <div className="sm:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-[#31442C] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-full bg-[#31442C]/90 text-[#D1B85E] ${isOpen ? 'block' : 'hidden'} sm:hidden`}>
          <button onClick={toggleMenu} className="absolute top-5 right-5 text-[#D1B85E] text-5xl font-bold z-50">×</button>
          <ul className="flex flex-col items-center justify-center h-full space-y-6 text-lg">
            {["Home", "Noticias", "Contacto", "Adopciones", "Login", "Registro"].map((item, idx) => (
              <li key={idx} className="transition-transform duration-200 ease-in-out hover:underline origin-center">
                <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`} onClick={toggleMenu}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative w-full max-w-sm p-6 bg-white rounded shadow-lg">
            <button onClick={toggleLogin} className="absolute top-2 right-2 text-gray-600 text-xl">&times;</button>
            <LoginForm />
          </div>
        </div>
      )}
      {showRegistro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative w-full max-w-sm p-6 bg-white rounded shadow-lg">
            <button onClick={toggleRegistro} className="absolute top-2 right-2 text-gray-600 text-xl">&times;</button>
            <Registro />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
