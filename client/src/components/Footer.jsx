import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Footer = () => {
  const footerContainerStyle = {
    width: '100%',
    backgroundColor: '#D1B85E',
    padding: '15px',
    boxSizing: 'border-box',
    color: '#31442C',
  };

  const footerContentStyle = {
    display: 'grid',
    gap: '15px',
    alignItems: 'flex-start',
    gridTemplateColumns: '1fr',
  };

  const logoStyle = {
    width: '200px',
    height: 'auto',
  };

  const sectionsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    textAlign: 'left',
  };

  const sectionTitleStyle = {
    gridColumn: '1 / -1',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#31442C'
  };

  const copyRightTextStyle = {
    color: '#31442C',
    fontSize: '0.9rem',
    textAlign: 'center',
    gridColumn: '1 / -1',
    marginTop: '20px',
  };

  return (
    <footer style={footerContainerStyle}>
      <div style={{ ...footerContentStyle, ...(window.innerWidth >= 768 && { gridTemplateColumns: 'auto 1fr auto' }) }}>
        
      
        <div>
          <img src={logo} alt="Logo" style={logoStyle} />
        </div>

        
        <ul style={sectionsContainerStyle}>
          <li style={sectionTitleStyle}>SECCIONES</li>
          <li><Link to="/adopciones">Adopciones</Link></li>
          <li><Link to="/historiasDeAdopcion">Historias</Link></li>
          <li><Link to="/noticias">Noticias</Link></li>
          <li><Link to="/registro">Registro</Link></li>
          <li><Link to="/voluntariado">Voluntariado</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </div>

      <p style={copyRightTextStyle}>Copyright © 2024 Rescue Factory</p>
    </footer>
  );
};

export default Footer;
