import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#D1B85E] text-[#31442C] p-4">
      <div className="container mx-auto flex flex-col items-center gap-4 md:grid md:grid-cols-3">
        
        {/* Logo - siempre a la izquierda en móviles, centrado en desktop */}
        <div className="flex w-full justify-center md:justify-start md:col-span-1">
          <img src={logo} alt="Logo" className="w-48 h-auto" />
        </div>

        {/* Secciones - a la derecha del logo en móviles, debajo en desktop */}
        <ul className="grid grid-cols-2 gap-y-2 md:grid-cols-1 text-left w-full md:col-span-1 md:text-center">
          <li className="font-bold col-span-2 mb-2 text-[#31442C] text-center">SECCIONES</li>
          <li><Link to="/adopciones">Adopciones</Link></li>
          <li><Link to="/historiasDeAdopcion">Historias</Link></li>
          <li><Link to="/noticias">Noticias</Link></li>
          <li><Link to="/registro">Registro</Link></li>
          <li><Link to="/voluntariado">Voluntariado</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>

        {/* Copyright - centrado y debajo en todas las pantallas */}
        <p className="text-center text-sm w-full mt-4 md:mt-0 md:col-span-3 text-[#31442C]">© 2024 Rescue Factory</p>
      </div>
    </footer>
  );
};

export default Footer;
