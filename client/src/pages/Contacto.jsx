
import ContactForm from '../components/ContactForm';
import HeaderContactImg from '../assets/images/Header_contact.png';
import HeaderContactMobile from '../assets/images/Header_contact_mobile.png';

const Contacto = () => {
    return  (
    <main className="min-h-screen w-full m-0 bg-[#76816A] font-['Inter'] pb-20">
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
       <section className="w-[80%] mx-auto px-8 sm:px-4 md:px-14 lg:px-20 text-[#F5F5F5]">
        <h1 className="font-bold mt-10 mb-8 sm:my-6 md:my-10 text-4xl lg:text-7xl">
          CONTACTO
        </h1>
        <section className="flex justify-center">
        <ContactForm />
        </section>
    
    </section>
  </main>
);
}

export default Contacto
