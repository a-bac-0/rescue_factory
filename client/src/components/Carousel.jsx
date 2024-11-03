import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Arrow1 from '../assets/images/Arrow 1.svg'
import Arrow2 from '../assets/images/Arrow 2.svg'

const Carousel = ({ dataType }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isSwiping, setIsSwiping] = useState(false)
    const startX = useRef(0)
    const diffX = useRef(0)
    const intervalRef = useRef(null)

    // Simulación base de datos de adoptions hasta que esté lista la base de datos real
    const adoptions = [
        {
            id: 1,
            name: 'Firulais',
            age: '2 años',
            sex: 'Macho',
            category: 'Perros',
            content:
                'Firulais es un perro muy cariñoso y juguetón. Le encanta correr en el parque y jugar con otros perros. Siempre está listo para una aventura.',
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
                'Tom es un gato travieso que siempre está en busca de aventuras. Le encanta escalar y jugar con sus juguetes favoritos. Es un gran compañero para todos.',
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
                'Luna es una perrita tranquila que ama los paseos cortos y las siestas largas. Disfruta de la compañía de su dueño y siempre está lista para un abrazo.',
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
                'Max es muy inteligente y le encanta aprender trucos nuevos. Siempre está buscando maneras de entretenerse y también de entretener a su familia. Es un gran amigo.',
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
                'Misu es una gatita tierna que le encanta dormir en lugares cálidos. Es muy juguetona y siempre busca compañía para jugar y divertirse.',
            url_images:
                'https://images.unsplash.com/photo-1574158622682-e40e69881006?fit=crop&w=800&q=80',
            user_id: 223,
        },
    ]
    const posts = [
        {
            id: '101',
            title: 'Noticias del día',
            date: '2024-10-27',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
            url_images:
                'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/15665/production/_107435678_perro1.jpg.webp',
        },
        {
            id: '102',
            title: 'Día del perro',
            date: '2024-10-27',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
            url_images:
                ' https://i.blogs.es/0fd60e/golden-retriever/500_333.jpeg',
        },
    ]

    // Elección de la base de datos según el tipo de datos
    const data = dataType === 'adoptions' ? adoptions : posts

    // Limite de caracteres para la descripción
    const CHAR_LIMIT = 100

    // Función para recortar el texto sin cortar palabras
    const truncateContent = (text) => {
        if (text.length <= CHAR_LIMIT) return text
        const words = text.split(' ')
        let truncatedText = ''
        for (let word of words) {
            if ((truncatedText + word).length > CHAR_LIMIT) break
            truncatedText += word + ' '
        }
        return truncatedText.trim() + '...'
    }

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1))
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

    // Animación de transiciones entre slides
    useEffect(() => {
        gsap.fromTo(
            '.slide-img',
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 1 }
        )
    }, [currentSlide])

    // Eventos táctiles para deslizamiento
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
        if (diffX.current > 50) handleNext()
        else if (diffX.current < -50) handlePrev()
        resetTimer()
        diffX.current = 0
    }

    const handleCarouselClick = () => {
        const id = data[currentSlide].id
        window.location.href = `/${dataType}/${id}`
    }

    return (
        <div className="container w-full px-4 md:px-1">
            <div className="flex flex-col md:flex-row bg-white w-full max-w-6xl mx-auto h-[700px] md:h-[600px] shadow-lg rounded-lg overflow-hidden">
                <div className="w-full font-inter md:w-[320px] p-8 flex flex-col justify-center items-start shrink-0">
                    <h2 className="text-xl font-inter font-bold text-gray-700">
                        {dataType === 'adoptions'
                            ? data[currentSlide].name
                            : data[currentSlide].title}
                    </h2>
                    <p className="text-sm font-inter text-gray-500">
                        {dataType === 'adoptions'
                            ? data[currentSlide].sex
                            : data[currentSlide].date}
                    </p>
                    {dataType === 'adoptions' && (
                        <div className="text-sm font-inter text-gray-500 text-left">
                            {data[currentSlide].age}
                        </div>
                    )}
                    <p className="mt-4 text-sm font-inter text-gray-500">
                        {truncateContent(data[currentSlide].content)}
                    </p>
                    <button
                        onClick={handleCarouselClick}
                        className="mt-3 font-inter bg-[#D0A24C] text-black  py-2 rounded-lg w-32"
                    >
                        Leer más
                    </button>
                </div>

                <div className="relative flex-1 flex flex-col items-center md:items-start justify-center pr-7 pl-7 md:h-[650px] lg:h-[600px]">
                    <div
                        className="relative w-full  h-auto"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleTouchStart}
                        onMouseMove={handleTouchMove}
                        onMouseUp={handleTouchEnd}
                        onMouseLeave={handleTouchEnd}
                    >
                        <div className="aspect-[5.4/6] xsss:aspect-[7.7/7] xss:aspect-7/5 xs:aspect-[6.4/5] sm:aspect-[7.2/5] md:aspect-[5/6] lg:aspect-[16/11.9] xl:aspect-[16/9.8] w-full">
                            <img
                                className="slide-img w-full h-full object-cover rounded-lg"
                                src={data[currentSlide].url_images}
                                alt={
                                    data[currentSlide].name ||
                                    data[currentSlide].title
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-row gap-3  items-center justify-center md:justify-start mt-4">
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
