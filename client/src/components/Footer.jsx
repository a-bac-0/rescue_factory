import React from 'react';
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
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    alignItems: 'flex-start',
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
      <div style={footerContentStyle}>

        <div>
          <img src={logo} alt="Logo" style={logoStyle} />
        </div>


        <ul style={sectionsContainerStyle}>
          <li style={sectionTitleStyle}>SECCIONES</li>
          <li>Adopciones</li>
          <li>Historias</li>
          <li>Noticias</li>
          <li>Registro</li>
          <li>Voluntariado</li>
          <li>Login</li>
          <li>Contacto</li>
        </ul>
      </div>

      <p style={copyRightTextStyle}>Copyright © 2024 Rescue Factory</p>
    </footer>
  );
};

export default Footer;