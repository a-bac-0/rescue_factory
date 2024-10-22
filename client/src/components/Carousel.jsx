import React, { useState } from 'react'
import Arrow1 from '../assets/images/Arrow 1.svg'
import Arrow2 from '../assets/images/Arrow 2.svg'

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            name: 'Firulais',
            age: '2 años',
            sex: 'Macho',
            description:
                'Firulais es un perro muy cariñoso y juguetón. Le encanta correr en el parque.',
            image: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?fit=crop&w=800&q=80',
        },
        {
            name: 'Luna',
            age: '4 años',
            sex: 'Hembra',
            description:
                'Luna es una perrita tranquila que ama los paseos cortos y las siestas largas.',
            image: 'https://content.nationalgeographic.com.es/medio/2024/09/23/perro-triste-istock-kerkez_94902f27_240923142256_1280x855.jpg',
        },
        {
            name: 'Max',
            age: '3 años',
            sex: 'Macho',
            description:
                'Max es muy inteligente y le encanta aprender trucos nuevos.',
            image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?fit=crop&w=800&q=80',
        },
    ]

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }

    return (
        <div className="container w-full px-4 md:px-1">
            {/* Contenedor principal con dimensiones fijas pero responsivas */}
            <div className="flex flex-col md:flex-row bg-white w-full max-w-6xl mx-auto h-[800px] md:h-[600px] shadow-lg rounded-lg overflow-hidden">
                {/* Sección de texto */}
                <div className="w-full md:w-[320px] p-8 flex flex-col justify-center items-start shrink-0">
                    <h2 className="text-xl font-bold text-gray-700">
                        {slides[currentSlide].name}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {slides[currentSlide].sex}
                    </p>
                    {/* Contenedor para la edad */}
                    <div className="text-sm text-gray-500 text-left">
                        {slides[currentSlide].age}
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        {slides[currentSlide].description}
                    </p>
                    {/* Ajuste del margen del botón */}
                    <button className="mt-3 bg-[#D1B85E] text-black px-4 py-2 rounded-lg w-32">
                        Leer más
                    </button>
                </div>

                {/* Contenedor de imagen y flechas */}
                <div className="relative flex-1 flex flex-col items-center md:items-start justify-center pr-7 pl-7 md:h-[650px] lg:h-[600px]">
                    {/* Contenedor de imagen con proporciones diferentes según dispositivo */}
                    <div className="relative w-full h-auto">
                        <div className="aspect-[5/8] md:aspect-[16/10] w-full">
                            <img
                                className="w-full h-full object-cover rounded-lg"
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].name}
                            />
                        </div>
                    </div>
                    {/* Contenedor para las flechas */}
                    <div className="flex flex-row gap-3 mb-5 md:mb-2 items-center justify-center md:justify-start mt-4">
                        <button
                            onClick={handlePrev}
                            className="bg-white border border-black hover:bg-gray-200 p-2 transition-all duration-300 rounded-md flex items-center justify-center w-16 h-12"
                        >
                            <img
                                src={Arrow1}
                                alt="Anterior"
                                className="w-4 h-4"
                            />
                        </button>
                        <button
                            onClick={handleNext}
                            className="bg-white border border-black hover:bg-gray-200 p-2 transition-all duration-300 rounded-md flex items-center justify-center w-16 h-12"
                        >
                            <img
                                src={Arrow2}
                                alt="Siguiente"
                                className="w-4 h-4"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel
