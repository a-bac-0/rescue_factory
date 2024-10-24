import React from "react";
import HeaderHomeImg from "../assets/images/Header_home.svg";

const Home = () => {
  return (
    <main className="min-h-screen w-full m-0 bg-[#76816A] font-['Inter']">
      <img
        src={HeaderHomeImg}
        alt="Header Home"
        className="w-full h-auto object-cover"
      />
      <section className="w-full min-w-[314px] max-w-[850px] mx-auto px-4 md:px-14 mb-36 text-[#F5F5F5]">
        <h1 className="font-bold my-6 md:my-10 text-4xl">EL REFUGIO</h1>
        <p className="my-8 text-justify">
          En el corazón de nuestra comunidad, Rescue Factory se alza como un
          faro de esperanza para aquellos amigos de cuatro patas que más lo
          necesitan. Somos más que un simple refugio; somos una familia dedicada
          a transformar vidas, tanto de animales como de personas, a través del
          amor incondicional y el compromiso inquebrantable.
        </p>
        <h2 className="my-8 font-bold text-2xl">Lo Que Hacemos</h2>
        <ul className="list-inside list-disc">
          <li className="pb-4">Rescatamos a perros y gatos en situación de vulnerabilidad</li>
          <li className="pb-4">Proporcionamos atención veterinaria completa</li>
          <li className="pb-4">
            Ofrecemos un ambiente seguro y amoroso durante su recuperación
          </li>
          <li className="pb-4">
            Trabajamos incansablemente en encontrar hogares perfectos para cada
            uno de nuestros residentes
          </li>
          <li>
            Realizamos un cuidadoso proceso de adopción para asegurar el mejor
            match entre mascotas y familias
          </li>
        </ul>
        
        <p className="my-4 text-justify">
          Porque creemos que cada vida peluda merece una segunda oportunidad, y
          cada hogar se hace más feliz con el amor incondicional de una mascota
          rescatada.
        </p>
        <i className="font-serif text-[#31442C]">En Rescue Factoría, no solo salvamos vidas, creamos familias.</i>
      </section>

      
      <section className="relative min-h-dvh bg-[#31442C]">
        <div className="absolute -top-[2.5rem] left-0 w-full h-full flex justify-center ">
          <h1 className="font-black text-5xl text-[#31442C]">ADOPCIONES

          </h1>
        </div>
      

      </section>

      <section className="relative min-h-dvh bg-[#77633d]">
      <div className="absolute -top-[5.5rem] left-0 w-full h-full flex justify-center">
        <h1 className="font-black text-5xl text-[#77633d]">LO ÚLTIMO<br />
        EN NOTICIAS
        </h1>
        </div>
       
      </section>
    </main>
  );
};

export default Home;
