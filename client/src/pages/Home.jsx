import React from 'react'
import HeaderHomeImg from '../assets/images/Header_home.svg'



const Home = () => {

    return (
        <div className="min-h-screen w-full  object-cover m-0 bg-[#76816A]">
            <img
                src={HeaderHomeImg}
                alt="Header Home"
                className="w-full h-auto"
            />
            <div>
                <h1 className="font-i">EL REFUGIO</h1>
                <p>
                En el corazón de nuestra comunidad, Rescue Factory se alza como un faro de esperanza para aquellos amigos de cuatro patas que más lo necesitan. Somos más que un simple refugio; somos una familia dedicada a transformar vidas, tanto de animales como de personas, a través del amor incondicional y el compromiso inquebrantable.
                </p>
                <h2>Lo Que Hacemos</h2>
                <ul>
                    <li>Rescatamos a perros y gatos en situación de vulnerabilidad</li>
                    <li>Proporcionamos atención veterinaria completa</li>
                    <li>Ofrecemos un ambiente seguro y amoroso durante su recuperación</li>
                    <li>Trabajamos incansablemente en encontrar hogares perfectos para cada uno de nuestros residentes</li>
                    <li>Realizamos un cuidadoso proceso de adopción para asegurar el mejor match entre mascotas y familias</li>
                </ul>
                <h2>Únete a Nuestra Causa</h2>
                <p>
                Rescue Factoría es más que un refugio; somos una comunidad de amantes de los animales comprometidos con hacer del mundo un lugar mejor para nuestros amigos peludos. Ya sea como adoptante, voluntario o donante, hay muchas formas de ser parte de esta hermosa misión.
                </p>
                <p>
                Porque creemos que cada vida peluda merece una segunda oportunidad, y cada hogar se hace más feliz con el amor incondicional de una mascota rescatada.
                </p>
                <i>En Rescue Factoría, no solo salvamos vidas, creamos familias.</i>
            </div>
        </div>
    )
}

export default Home
