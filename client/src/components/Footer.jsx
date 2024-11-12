import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#D1B85E] text-[#31442C] py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img src={logo} alt="Logo" className="w-40 h-auto" />
          </div>
          <ul className="flex flex-col md:flex-row gap-4 text-center">
            <li className="font-bold">SECCIONES</li>
            <li><Link to="/adopciones">Adopciones</Link></li>
            <li><Link to="/noticias">Noticias</Link></li>
            <li><Link to="/registro">Registro</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <p className="text-center mt-4">© 2024 Rescue Factory</p>
      </div>
    </footer>
  );
};

export default Footer;
