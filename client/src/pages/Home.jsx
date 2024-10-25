import React from "react";
import HeaderHomeImg from "../assets/images/Header_home.svg";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
    <main className="min-h-screen w-full m-0 bg-[#76816A] font-['Inter']">
      <img
        src={HeaderHomeImg}
        alt="Header Home"
        className="w-full h-auto object-cover"
      />
 
      <section className="w-full min-w-[314px] max-w-[850px] mx-auto px-8 sm:px-4 md:px-14 lg:px-20 mb-36 text-[#F5F5F5]">
        <h1 className="font-bold mt-10 mb-8 sm:my-6 md:my-10 text-4xl">
          EL REFUGIO
        </h1>
        <p className="mb-10 sm:my-8 text-justify">
          En el corazón de nuestra comunidad, Rescue Factory se alza como un
          faro de esperanza para aquellos amigos de cuatro patas que más lo
          necesitan. Somos más que un simple refugio; somos una familia dedicada
          a transformar vidas, tanto de animales como de personas, a través del
          amor incondicional y el compromiso inquebrantable.
        </p>
        <h2 className="mb-10 sm:my-8 font-bold text-2xl">Lo Que Hacemos</h2>
        <ul className="list-inside list-disc mb-10 sm:mb8">
          <li className="pb-6 sm:pb-4">
            Rescatamos a perros y gatos en situación de vulnerabilidad
          </li>
          <li className="pb-6 sm:pb-4">
            Proporcionamos atención veterinaria completa
          </li>
          <li className="pb-6 sm:pb-4">
            Ofrecemos un ambiente seguro y amoroso durante su recuperación
          </li>
          <li className="pb-6 sm:pb-4">
            Trabajamos incansablemente en encontrar hogares perfectos para cada
            uno de nuestros residentes
          </li>
          <li className="pb-6 sm:pb-0">
            Realizamos un cuidadoso proceso de adopción para asegurar el mejor
            match entre mascotas y familias
          </li>
        </ul>

        <p className="mb-8 sm:my-4 text-justify">
          Porque creemos que cada vida peluda merece una segunda oportunidad, y
          cada hogar se hace más feliz con el amor incondicional de una mascota
          rescatada.
        </p>
        <i className="font-serif text-[#31442C] block mb-10 sm:mb-4">
          En Rescue Factoría, no solo salvamos vidas, creamos familias.
        </i>
      </section>
   
      <section className="relative min-h-dvh bg-[#31442C] pt-14 pb-36">
        <div className="absolute -top-[2.5rem] sm:-top-[2.5rem] left-0 w-full h-full flex justify-center ">
          <h1 className="font-black text-5xl text-[#31442C]">ADOPCIONES</h1>
        </div>
        <section className="w-full min-w-[314px] max-w-[850px] mx-auto px-8 sm:px-4 md:px-14 lg:px-20 mb-36">
          <Carousel />
        </section>
      </section>

      <section className="relative min-h-dvh bg-[#77633d]">
        <div className="absolute -top-[5.5rem] sm:-top-[5.5rem] left-0 w-full h-full flex justify-center">
          <h1 className="font-black text-5xl text-[#77633d]">
            LO ÚLTIMO
            <br />
            EN NOTICIAS
          </h1>
        </div>
      </section>
    </main>
  );
};

export default Home;
