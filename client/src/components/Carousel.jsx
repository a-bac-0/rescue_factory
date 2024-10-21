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
        <div className="bg-[#6D775C] py-10">
            <div className="container w-full">
                {/* Contenedor principal */}
                <div className="flex flex-col md:flex-row bg-white w-[90%] ">
                    {/* Sección texto */}
                    <div className="p-6 flex flex-col justify-center w-full md:w-1/2 mx-4">
                        <h2 className="text-xl font-bold text-gray-700">
                            {slides[currentSlide].name}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {slides[currentSlide].sex}
                        </p>
                        {/* Contenedor para la edad */}
                        <div className="text-sm text-gray-500 md:text-left text-center">
                            {slides[currentSlide].age}
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                            {slides[currentSlide].description}
                        </p>
                        <button className="mt-4 bg-[#D0A24C] text-black px-4 py-2 rounded-lg w-[30%]">
                            Ver más
                        </button>
                    </div>

                    {/* Contenedor de imagen y flechas */}
                    <div className="relative w-full md:w-[70%] flex flex-col items-center md:items-start justify-center">
                        <img
                            className="object-contain w-[90%] h-[90%] mt-[5%]"
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].name}
                        />
                        {/* Contenedor para las flechas  */}
                        <div className="flex flex-row items-center mt-2 py-2 gap-x-2">
                            {' '}
                            <button
                                onClick={handlePrev}
                                className="bg-white border border-black hover:bg-gray-200 p-2 transition-all duration-300 rounded-md flex items-center justify-center px-4"
                            >
                                <img
                                    src={Arrow1}
                                    alt="Previous"
                                    className="w-4 h-4"
                                />
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-white border border-black hover:bg-gray-200 p-2 transition-all duration-300 rounded-md flex items-center justify-center px-4"
                            >
                                <img
                                    src={Arrow2}
                                    alt="Next"
                                    className="w-4 h-4"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel
