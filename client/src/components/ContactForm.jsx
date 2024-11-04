import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', message: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.lastname || !formData.email || !formData.message) {
      setError("Por favor llenar todos los campos.");
      return;
    }
  
    console.log("Data submitted:", formData);
    setError(null);
    setFormData({ name: '', surname: '', email: '', message: '' }); // Reset form data
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="name" className="block text-[#ffffff]-700 font-medium mb-1">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastname" className="block text-[#ffffff]-700 font-medium mb-1">
          Apellido
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-[#ffffff]-700 font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-[#ffffff]-700 font-medium mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        </div>
      <button
        type="submit"
        className="bg-[#D1B85E]-500 hover:bg-[#D6CA9E]-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6CA9E]-500"
      >
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;