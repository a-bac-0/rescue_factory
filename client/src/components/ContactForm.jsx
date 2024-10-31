import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', surname:'', email: '', message: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar lógica de validación o envío
    if (!formData.name || !formData.email || !formData.message) {
      setError("Por favor completa todos los campos.");
      return;
    }
    // Enviar datos
    console.log("Datos enviados:", formData);
    setError(null); // Limpiar errores al enviar correctamente
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Nombre:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Apellido:
        <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Mensaje:
        <textarea name="message" value={formData.message} onChange={handleChange} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactForm;
