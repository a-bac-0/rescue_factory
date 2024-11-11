import React, { useEffect, useState } from "react";
import HeaderHomeImg from "../assets/images/Header_home.svg";
import HeaderHomeMobile from "../assets/images/Header_home_mobile.svg";
import Carousel from "../components/Carousel";
import MyButton from "../components/Button";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  const [adoptionData, setAdoptionData] = useState([]);

  useEffect(() => {
    const fetchAdoptions = async () => {
      const API_URL =
           '/api/adoptions'; // Endpoint fake
  
      try {
          const response = await fetch(API_URL);
          const data = await response.json();
          setAdoptionData(data);
      } catch (error) {
          console.error("Error al obtener datos:", error);
      }
  };

    fetchAdoptions();
  }, []);

  return (
    <main className="min-h-screen w-full m-0 bg-[#76816A] font-['Inter']">
      <img
        src={HeaderHomeImg}
        alt="Header Home"
        className="w-full h-auto object-cover hidden md:block"
      />

      <img
        src={HeaderHomeMobile}
        alt="Header Home"
        className="w-full h-auto object-cover block md:hidden"
      />

      <section className="w-95%] mx-auto px-8 sm:px-4 md:px-14 lg:px-20 mb-36 text-[#F5F5F5]">
        <h1 className="font-bold mt-10 mb-8 sm:my-6 md:my-10 text-5xl lg:text-7xl">
          EL REFUGIO
        </h1>
        <p className="mb-10 sm:my-8 lg:text-2xl text-justify">
          En el corazón de nuestra comunidad, Rescue Factory se alza como un
          faro de esperanza para aquellos amigos de cuatro patas que más lo
          necesitan. Somos más que un simple refugio; somos una familia dedicada
          a transformar vidas, tanto de animales como de personas, a través del
          amor incondicional y el compromiso inquebrantable.
        </p>
        <h2 className="mb-10 sm:my-8 font-bold text-4xl">Lo Que Hacemos</h2>
        <ul className="list-inside list-disc lg:text-2xl mb-10 sm:mb8">
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

        <p className="mb-8 sm:my-4 lg:text-2xl text-justify">
          Porque creemos que cada vida peluda merece una segunda oportunidad, y
          cada hogar se hace más feliz con el amor incondicional de una mascota
          rescatada.
        </p>
        <i className="font-serif lg:text-2xl text-[#31442C] block mb-10 sm:mb-4">
          En Rescue Factoría, no solo salvamos vidas, creamos familias.
        </i>

        <section className="pt-[38px] flex justify-center">
          <MyButton
            label="¡HAZTE SOCIO!"
            onClick={() => navigate("/Registro")}
            className={`w-[350px] h-[70px]`}
          />
        </section>
      </section>

      <section className="relative top-[0.6rem] md:top-[0.7rem] lg:top-[1rem] left-0 w-full h-full flex justify-center">
        <h1 className="font-bold text-5xl  md:text-6xl lg:text-7xl text-[#31442C]">
          ADOPCIONES
        </h1>
      </section>
      <section className="relative min-h-dvh bg-[#31442C] pt-14 pb-36">
        <section className="w-full min-w-[314px] max-w-6xl mx-auto px-8 sm:px-4 md:px-14 lg:px-20 mb-36">
          <Carousel dataType="adoptions" />

          <section className="pt-[38px] flex justify-center">
            <MyButton
              label="MÁS ADOPCIONES"
              onClick={() => navigate("/Adopciones")}
=========
        fetchAdoptions()
    }, [])

    return (
        <main className="min-h-screen w-full m-0 bg-[#76816A] font-['Inter']">
            <img
                src={HeaderHomeImg}
                alt="Header Home"
                className="w-full h-auto object-cover hidden md:block"
>>>>>>>>> Temporary merge branch 2
            />

            <img
                src={HeaderHomeMobile}
                alt="Header Home"
                className="w-full h-auto object-cover block md:hidden"
            />

<<<<<<<<< Temporary merge branch 1
        <section className="pt-[38px] pb-[6rem] flex justify-center">
          <MyButton
            label="MÁS NOTICIAS"
            onClick={() => navigate("/Noticias")}
          />
        </section>
      </section>
    </main>
  );
};
=========
            <section className="w-[80%] mx-auto px-8 sm:px-4 md:px-14 lg:px-20 mb-36 text-[#F5F5F5]">
                <h1 className="font-bold mt-10 mb-8 sm:my-6 md:my-10 text-5xl lg:text-7xl">
                    EL REFUGIO
                </h1>
                <p className="mb-10 sm:my-8 lg:text-2xl text-justify">
                    En el corazón de nuestra comunidad, Rescue Factory se alza
                    como un faro de esperanza para aquellos amigos de cuatro
                    patas que más lo necesitan. Somos más que un simple refugio;
                    somos una familia dedicada a transformar vidas, tanto de
                    animales como de personas, a través del amor incondicional y
                    el compromiso inquebrantable.
                </p>
                <h2 className="mb-10 sm:my-8 font-bold text-4xl">
                    Lo Que Hacemos
                </h2>
                <ul className="list-inside list-disc lg:text-2xl mb-10 sm:mb8">
                    <li className="pb-6 sm:pb-4">
                        Rescatamos a perros y gatos en situación de
                        vulnerabilidad
                    </li>
                    <li className="pb-6 sm:pb-4">
                        Proporcionamos atención veterinaria completa
                    </li>
                    <li className="pb-6 sm:pb-4">
                        Ofrecemos un ambiente seguro y amoroso durante su
                        recuperación
                    </li>
                    <li className="pb-6 sm:pb-4">
                        Trabajamos incansablemente en encontrar hogares
                        perfectos para cada uno de nuestros residentes
                    </li>
                    <li className="pb-6 sm:pb-0">
                        Realizamos un cuidadoso proceso de adopción para
                        asegurar el mejor match entre mascotas y familias
                    </li>
                </ul>
>>>>>>>>> Temporary merge branch 2

                <p className="mb-8 sm:my-4 lg:text-2xl text-justify">
                    Porque creemos que cada vida peluda merece una segunda
                    oportunidad, y cada hogar se hace más feliz con el amor
                    incondicional de una mascota rescatada.
                </p>
                <i className="font-serif lg:text-2xl text-[#31442C] block mb-10 sm:mb-4">
                    En Rescue Factoría, no solo salvamos vidas, creamos
                    familias.
                </i>

                <section className="pt-[38px] flex justify-center">
                    <MyButton
                        label="¡HAZTE SOCIO!"
                        onClick={() => navigate('/Registro')}
                    />
                </section>
            </section>

            <section className="relative top-[0.6rem] md:top-[0.7rem] lg:top-[1rem] left-0 w-full h-full flex justify-center">
                <h1 className="font-bold text-5xl  md:text-6xl lg:text-7xl text-[#31442C]">
                    ADOPCIONES
                </h1>
            </section>
            <section className="relative min-h-dvh bg-[#31442C] pt-14 pb-36">
                <section className="w-full min-w-[314px] max-w-6xl mx-auto px-8 sm:px-4 md:px-14 lg:px-20 mb-36">
                    <Carousel dataType="adoptions" />

                    <section className="pt-[38px] flex justify-center">
                        <MyButton
                            label="MÁS ADOPCIONES"
                            onClick={() => navigate('/Adopciones')}
                        />
                    </section>
                </section>
            </section>

      <section className="relative min-h-dvh bg-[#77633d]">
        <section className="relative -top-[5.5rem] sm:-top-[5.5rem] md:-top-[7rem] lg:-top-[8rem] left-0 w-full h-full flex justify-center">
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-[#77633d]">
            LO ÚLTIMO
            <br />
            EN NOTICIAS
          </h1>
        </section>
       
        <section className="w-full min-w-[314px] max-w-6xl mx-auto px-8 sm:px-4 md:px-14 lg:px-20 mb-1">
        <Carousel dataType="posts" />
        </section>

                <section className="pt-[38px] pb-[6rem] flex justify-center">
                    <MyButton
                        label="MÁS NOTICIAS"
                        onClick={() => navigate('/Noticias')}
                        className="w-[100%]"
                    />
                </section>
            </section>
        </main>
    )
}

export default Home;
