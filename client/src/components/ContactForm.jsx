import React, { useState } from "react";
import { createMessage } from "../services/Contact_messagesServices.js"


const ContactForm = () => {
  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.message
    ) {
      return setError("Por favor llenar todos los campos.");
      
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
     return setError(
        "Por favor, introduzca un email válido que contenga '@' y un dominio."
      );
      
    }

    try {
      setError(null);
      const response = await createMessage(formData);
      console.log("Response from server:", response);
      setSuccessMessage("¡Se mensaje se ha enviado con éxito!");
      setFormData({ first_name: "", last_name: "", email: "", message: "" }); // Resetea formulario
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Ocurrió un error al enviar el mensaje. Por favor, intente nuevamente.");
    }
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
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {successMessage}
            </div>
          )}

          <div className="mb-4 md:w-[283px] lg:w-[385px]">
            <label
              htmlFor="name"
              className="block text-[#ffffff]-700 font-medium mb-1"
            >
              Nombre
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              aria-label="Nombre"
              className="border border-gray-300 text-black rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 md:w-[283px] lg:w-[385px]">
            <label
              htmlFor="last_name"
              className="block text-[#ffffff]-700 font-medium mb-1"
            >
              Apellido
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              aria-label="Apellido"
              className="border border-gray-300 text-black rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 md:w-[283px] lg:w-[385px]">
            <label
              htmlFor="email"
              className="block text-[#ffffff]-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-label="Email"
              className="border border-gray-300 text-black rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 md:w-[283px] lg:w-[385px]">
            <label
              htmlFor="message"
              className="block text-[#ffffff]-700 font-medium mb-1"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              aria-label="Mensaje"
              className="border border-gray-300 text-black rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full h-12 px-4 py-2 bg-[#d1b85e] rounded-lg border-2 border-neutral-100 justify-center items-center text-[#31442c] text-lg font-bold font-['Inter'] leading-normal hover:bg-[#d6c99e] transition duration-300 focus:outline-none focus:ring focus:ring-neutral-100 active:bg-[#d1b85e] text-center"
          >
            Enviar
          </button>
        </form>
      </section>
    </section>
  );
};

export default ContactForm;
