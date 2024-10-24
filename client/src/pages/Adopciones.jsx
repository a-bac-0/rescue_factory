import React from 'react'
import HeaderAdoptions from '../assets/images/Header_adoptions.svg'
import Carousel from '../components/Carousel'

const Adopciones = () => {
    return (
        <div className="min-h-screen w-full  object-cover m-0 bg-[#76816A]">
            <img
                src={HeaderAdoptions}
                alt="Header Adoptions"
                className="w-full h-auto"
            />
            <div>
                <h1 className="font-inter">RESCATA</h1>
                <p>
                    En nuestra protectora, estamos comprometidos con brindarte
                    la oportunidad de cambiar una vida. Cada perro y gato que
                    encontrarás aquí está esperando un hogar amoroso y una
                    familia que lo cuide. Nuestro equipo se asegura de que todos
                    los animales estén sanos, vacunados y listos para ser parte
                    de tu hogar. Adopta y dale una segunda oportunidad a un ser
                    lleno de cariño.
                </p>
            </div>
            <h1>
                Nuestros
                <br />
                Peludos
            </h1>
        </div>
    )
}

export default Adopciones
