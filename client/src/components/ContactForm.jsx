import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = React.useState({ name: '', surname: '', email: '', message: '' });
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
    <section className="w-[283px] px-10 py-5 border border-white-[1px]">
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
        className="w-[283px] h-[48px] px-[80px] py-[17px] bg-[#d1b85e] rounded-lg border-2 border-neutral-100 justify-center items-center gap-2.5 inline-flex text-[#31442c] text-lg font-bold font-['Inter'] leading-normal hover:bg-[#d6c99e] transition duration-300focus:outline-none focus:ring focus:ring-neutral-100 active:bg-[#d1b85e] align-center">
      
        Enviar
      </button>
    </form>
    </section>
  );
};

export default ContactForm;