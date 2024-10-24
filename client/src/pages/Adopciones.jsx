import React from 'react'
import HeaderAdoptions from '../assets/images/Header_adoptions.svg'
import Carousel from '../components/Carousel'

const Adopciones = () => {
    return (
        <div className="min-h-screen w-full object-cover m-0 bg-[#76816A]">
            <img
                src={HeaderAdoptions}
                alt="Header Adoptions"
                className="w-full h-auto"
            />
            <div className="flex items-center flex-col mt-6 w-full">
                <div className="w-[80%] mb-28">
                    <h1 className="font-inter text-3xl font-bold text-white mb-5">
                        RESCATA
                    </h1>
                    <p className="font-inter text-lg text-white">
                        En nuestra protectora, estamos comprometidos con
                        brindarte la oportunidad de cambiar una vida. Cada perro
                        y gato que encontrarás aquí está esperando un hogar
                        amoroso y una familia que lo cuide. Nuestro equipo se
                        asegura de que todos los animales estén sanos, vacunados
                        y listos para ser parte de tu hogar. Adopta y dale una
                        segunda oportunidad a un ser lleno de cariño.
                    </p>
                </div>
                <div className="flex justify-start w-[80%] mb-20">
                    <h1 className="font-inter text-8xl font-bold text-white text-left">
                        Nuestros
                        <br />
                        Peludos
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Adopciones
