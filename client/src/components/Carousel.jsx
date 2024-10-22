import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Arrow1 from '../assets/images/Arrow 1.svg'
import Arrow2 from '../assets/images/Arrow 2.svg'

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isSwiping, setIsSwiping] = useState(false)
    const startX = useRef(0)
    const diffX = useRef(0)
    const intervalRef = useRef(null)

    // Simulación base de datos de slides hasta que esté lista la base de datos real
    const slides = [
        {
            id: 1,
            name: 'Firulais',
            age: '2 años',
            sex: 'Macho',
            category: 'Perros',
            content:
                'Firulais es un perro muy cariñoso y juguetón. Le encanta correr en el parque.',
            url_images:
                'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?fit=crop&w=800&q=80',
            user_id: 1,
        },
        {
            id: 2,
            name: 'Tom',
            age: '5 años',
            sex: 'Macho',
            category: 'Gatos',
            content:
                'Tom es un gato travieso que siempre está en busca de aventuras.',
            url_images:
                'https://gatogazzu.org/wp-content/uploads/2021/09/gato-negro-930x620.jpg',
            user_id: 112,
        },
        {
            id: 3,
            name: 'Luna',
            age: '4 años',
            sex: 'Hembra',
            category: 'Perros',
            content:
                'Luna es una perrita tranquila que ama los paseos cortos y las siestas largas.',
            url_images:
                'https://content.nationalgeographic.com.es/medio/2024/09/23/perro-triste-istock-kerkez_94902f27_240923142256_1280x855.jpg',
            user_id: 2,
        },
        {
            id: 4,
            name: 'Max',
            age: '3 años',
            sex: 'Macho',
            category: 'Perros',
            content:
                'Max es muy inteligente y le encanta aprender trucos nuevos.',
            url_images:
                'https://images.unsplash.com/photo-1560807707-8cc77767d783?fit=crop&w=800&q=80',
            user_id: 3,
        },
        {
            id: 5,
            name: 'Misu',
            age: '2 años',
            sex: 'Hembra',
            category: 'Gatos',
            content:
                'Misu es una gatita tierna que le encanta dormir en lugares cálidos.',
            url_images:
                'https://images.unsplash.com/photo-1574158622682-e40e69881006?fit=crop&w=800&q=80',
            user_id: 223,
        },
    ]

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }

    // Temporizador automático para cambiar de slide en 5 segundos
    useEffect(() => {
        resetTimer()
        return () => clearInterval(intervalRef.current)
    }, [currentSlide])

    const resetTimer = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(handleNext, 5000)
    }

    // Animación. Transición de slides (imágenes)
    useEffect(() => {
        gsap.fromTo(
            '.slide-img',
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 0.5 }
        )
    }, [currentSlide])

    // Deslizamiento de slides con eventos táctiles
    const handleTouchStart = (e) => {
        setIsSwiping(true)
        startX.current = e.touches ? e.touches[0].clientX : e.clientX
    }

    const handleTouchMove = (e) => {
        if (!isSwiping) return
        diffX.current =
            startX.current - (e.touches ? e.touches[0].clientX : e.clientX)
    }

    const handleTouchEnd = () => {
        setIsSwiping(false)
        if (diffX.current > 50) {
            handleNext()
        } else if (diffX.current < -50) {
            handlePrev()
        }
        resetTimer()
        diffX.current = 0
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
                    <div className="text-sm text-gray-500 text-left">
                        {slides[currentSlide].age}
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        {slides[currentSlide].content}
                    </p>
                    <button className="mt-3 bg-[#D0A24C] text-black px-4 py-2 rounded-lg w-32">
                        Leer más
                    </button>
                </div>

                {/* Contenedor de imagen y flechas */}
                <div className="relative flex-1 flex flex-col items-center md:items-start justify-center pr-7 pl-7 md:h-[650px] lg:h-[600px]">
                    {/* Contenedor de imagen con deslizamiento de swipe */}
                    <div
                        className="relative w-full h-auto"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleTouchStart}
                        onMouseMove={handleTouchMove}
                        onMouseUp={handleTouchEnd}
                        onMouseLeave={handleTouchEnd}
                    >
                        <div className="aspect-[5/8] md:aspect-[16/10] w-full">
                            <img
                                className="slide-img w-full h-full object-cover rounded-lg"
                                src={slides[currentSlide].url_images}
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
