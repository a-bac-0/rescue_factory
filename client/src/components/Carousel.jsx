import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Arrow1 from '../assets/images/Arrow 1.svg'
import Arrow2 from '../assets/images/Arrow 2.svg'
import { getPosts } from '../services/PostsServices'
import { getAdoptions } from '../services/AdoptionsServices'

// Constantes para límites de caracteres
const CHAR_LIMIT_SMALL = 130
const CHAR_LIMIT_MEDIUM = 260

const Carousel = ({ dataType }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isSwiping, setIsSwiping] = useState(false)
    const [charLimit, setCharLimit] = useState(CHAR_LIMIT_SMALL)
    const [data, setData] = useState([])
    const startX = useRef(0)
    const diffX = useRef(0)
    const intervalRef = useRef(null)

    // Función para actualizar el límite dependiendo del width
    useEffect(() => {
        const updateCharLimit = () => {
            if (window.innerWidth >= 768) {
                setCharLimit(CHAR_LIMIT_MEDIUM)
            } else {
                setCharLimit(CHAR_LIMIT_SMALL)
            }
        }

        // Event listener para que se actualice el límite de caracteres al cambiar el tamaño de la ventana
        window.addEventListener('resize', updateCharLimit)
        updateCharLimit()

        // Actualización del límite de carácteres al cambiar el width
        return () => window.removeEventListener('resize', updateCharLimit)
    }, [])

    // Función para obtener los datos dependiendo del tipo de contenido
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result =
                    dataType === 'adoptions'
                        ? await getAdoptions()
                        : await getPosts()
                setData(result)
            } catch (error) {
                console.error('Error obteniendo los datos:', error)
            }
        }

        fetchData()
    }, [dataType])

    // Función para limitar el contenido de texto
    const truncateContent = (text) => {
        const words = text.split(' ')
        let truncatedText = ''
        for (let word of words) {
            if ((truncatedText + word).length > charLimit) break
            truncatedText += word + ' '
        }
        return truncatedText.trim() + ' (...)'
    }

    // Establecemos la variable currentSlide para que inicie en 0 y dependiendo de la función handlePrev o handleNext se le sume o reste 1 para cambiar de slide
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

    // Función para reiniciar el temporizador al cambiar de slide con los botones de navegación o táctiles
    const resetTimer = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(handleNext, 5000)
    }

    // Animación de transiciones entre slides con GSAP
    useEffect(() => {
        gsap.fromTo(
            '.slide-img',
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 1 }
        )
    }, [currentSlide])

    // Eventos táctiles para deslizamiento de slides en dispositivos móviles
    const handleTouchStart = (e) => {
        setIsSwiping(true)
        startX.current = e.touches ? e.touches[0].clientX : e.clientX
    }

    // Función para detectar el movimiento del dedo y cambiar de slide
    const handleTouchMove = (e) => {
        if (!isSwiping) return
        diffX.current =
            startX.current - (e.touches ? e.touches[0].clientX : e.clientX)
    }

    // Función para detectar el final del deslizamiento y cambiar de slide
    const handleTouchEnd = () => {
        setIsSwiping(false)
        if (diffX.current > 50) handleNext()
        else if (diffX.current < -50) handlePrev()
        resetTimer()
        diffX.current = 0
    }

    // Función para redirigir a la página de detalles al hacer clic en el botón "Seguir leyendo"
    const handleCarouselClick = () => {
        const id = data[currentSlide].id
        window.location.href = `/${dataType}/${id}`
    }

    return (
        <div className="container w-full px-4 md:px-1">
            <div className="flex flex-col md:flex-row bg-white w-full max-w-6xl mx-auto h-[700px] md:h-[600px] shadow-lg rounded-lg overflow-hidden">
                <div className="w-full font-inter md:w-[320px] p-8 flex flex-col justify-center items-start shrink-0">
                    {data[currentSlide] ? (
                        <>
                            <h2 className="text-xl font-inter font-bold text-black">
                                {dataType === 'adoptions'
                                    ? data[currentSlide].name
                                    : data[currentSlide].title}
                            </h2>
                            <p className="text-sm font-inter text-black">
                                {dataType === 'adoptions'
                                    ? data[currentSlide].sex
                                    : data[currentSlide].date}
                            </p>
                            {dataType === 'adoptions' && (
                                <div className="text-sm font-inter text-black text-left">
                                    {data[currentSlide].age} años
                                </div>
                            )}
                            <p className="mt-4 text-sm font-inter text-black">
                                {truncateContent(data[currentSlide].content)}
                            </p>
                            <button
                                onClick={handleCarouselClick}
                                className="mt-3 font-inter bg-[#D0A24C] text-black py-2 rounded-lg w-32"
                            >
                                Seguir leyendo
                            </button>
                        </>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </div>

                <div className="relative flex-1 flex flex-col items-center md:items-start justify-center pr-7 pl-7 md:h-[650px] lg:h-[600px]">
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
                        {data[currentSlide] ? (
                            <div className="aspect-[5.4/6] xsss:aspect-[7.7/7] xss:aspect-7/5 xs:aspect-[6.4/5] sm:aspect-[7.2/5] md:aspect-[5/6] lg:aspect-[16/11.9] xl:aspect-[16/12.7] w-full">
                                <img
                                    className="slide-img w-full h-full object-cover rounded-lg"
                                    src={data[currentSlide].url_images}
                                    alt={
                                        data[currentSlide].name ||
                                        data[currentSlide].title
                                    }
                                />
                            </div>
                        ) : (
                            <p>Cargando imagen...</p>
                        )}
                    </div>

                    <div className="flex flex-row gap-3 items-center justify-center md:justify-start mt-4">
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
