import React from 'react'
import ContactForm from '../components/ContactForm';
import HeaderContactImg from '../assets/images/Header_contact.png';
import HeaderContactMobile from '../assets/images/Header_contact_mobile.png';

const Contacto = () => {
    return  (
    <main className="min-h-screen w-full m-0 bg-[#76816A] font-['Inter']">
        <img
        src={HeaderContactImg}
        alt="Header Home"
        className="w-full h-auto object-cover hidden md:block"
      />

      <img
        src={HeaderContactMobile}
        alt="Header Home"
        className="w-full h-auto object-cover block md:hidden"
      />
        <section className="w-[80%]">
 
    <h1>Contáctanos</h1>
    <p>Llena el formulario para ponerte en contacto con nosotros.</p>
    <ContactForm />
    </section>
  </main>
);
}

export default Contacto
