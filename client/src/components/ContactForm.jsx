import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = React.useState({ first_name: '', last_name: '', email: '', message: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.message) {
      setError("Por favor llenar todos los campos.");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor introducir un email válido.");
      return;
    }


    console.log("Data submitted:", formData);
    setError(null);
    setFormData({ first_name: '', last_name: '', email: '', message: '' }); // Reset form data
  };

  return (
    <section className="lg:w-[80%] flex justify-left items-center h-[650px] border border-white">
    <section className="px-10 py-5 bg-[#76816A]">
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="mb-4 md:w-[283px] lg:w-[385px]">
        <label htmlFor="name" className="block text-[#ffffff]-700 font-medium mb-1">
          Nombre
        </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="border border-gray-300 text-black rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4 md:w-[283px] lg:w-[385px]">
        <label htmlFor="last_name" className="block text-[#ffffff]-700 font-medium mb-1">
          Apellido
        </label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="border border-gray-300 text-black rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4 md:w-[283px] lg:w-[385px]">
        <label htmlFor="email" className="block text-[#ffffff]-700 font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 text-black rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4 md:w-[283px] lg:w-[385px]">
        <label htmlFor="message" className="block text-[#ffffff]-700 font-medium mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="border border-gray-300 text-black rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        </div>
      <button
        type="submit"
        className="w-[100px] h-[48px] px-[10px] py-[17px] bg-[#d1b85e] rounded-lg border-2 border-neutral-100 justify-center items-center gap-2.5 inline-flex text-[#31442c] text-lg font-bold font-['Inter'] leading-normal hover:bg-[#d6c99e] transition duration-300focus:outline-none focus:ring focus:ring-neutral-100 active:bg-[#d1b85e] align-center">
      
        Enviar
      </button>
    </form>
    </section>
    </section>
  );
};

export default ContactForm;