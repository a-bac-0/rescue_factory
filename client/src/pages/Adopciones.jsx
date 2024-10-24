import React from 'react'
import HeaderAdoptions from '../assets/images/Header_adoptions.svg'

const Adopciones = () => {
    return (
        <div className="min-h-screen w-full object-cover m-0 bg-[#76816A]">
            <img
                src={HeaderAdoptions}
                alt="Header Adoptions"
                className="w-full h-auto"
            />
            <div className="flex items-center flex-col mb-26 mt-6 w-full">
                <div className="w-[80%] mb-28">
                    <h1 className="font-inter text-[9vw] font-bold text-white mb-5">
                        RESCATA
                    </h1>
                    <p className="font-inter text-[3.5vw] text-white">
                        En nuestra protectora, estamos comprometidos con
                        brindarte la oportunidad de cambiar una vida. Cada perro
                        y gato que encontrarás aquí está esperando un hogar
                        amoroso y una familia que lo cuide. Nuestro equipo se
                        asegura de que todos los animales estén sanos, vacunados
                        y listos para ser parte de tu hogar. Adopta y dale una
                        segunda oportunidad a un ser lleno de cariño.
                    </p>
                </div>
                <div className="flex justify-start w-[80%]">
                    <h1 className="font-inter relative top-[4vh] text-[15vw] font-bold text-white text-left text-customGreen mb-0">
                        Nuestros
                        <br />
                        Peludos
                    </h1>
                </div>
            </div>
            <div className="text-white h-7 bg-customGreen mt-0 pt-0 pb-0">
                {' '}
                Filtrado y posts
            </div>
        </div>
    )
}

export default Adopciones
