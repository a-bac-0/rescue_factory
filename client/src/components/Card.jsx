import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import like_button from '../assets/images/like_button.svg'
import MyButton from '../components/Button'

// Constantes para límites de caracteres
const CHAR_LIMIT_SMALL = 70
const CHAR_LIMIT_MEDIUM = 200
const CHAR_LIMIT_LARGE = 320

const Card = ({ datatype, data }) => {
    // Estado inicial para manejar el límite de caracteres, mobile first
    const [charLimit, setCharLimit] = useState(CHAR_LIMIT_SMALL)
    // Estado para  identificar si el usuario ha dado "me gusta"
    const [isLiked, setIsLiked] = useState(false)

    // Función para actualizar el límite dependiendo del width
    useEffect(() => {
        const updateCharLimit = () => {
            if (window.innerWidth >= 1024) {
                setCharLimit(CHAR_LIMIT_LARGE)
            } else if (window.innerWidth >= 768) {
                setCharLimit(CHAR_LIMIT_MEDIUM)
            } else {
                setCharLimit(CHAR_LIMIT_SMALL)
            }
        }

        // Event listener para que se actualice el límite de caracteres al cambiar el tamaño de la ventana
        window.addEventListener('resize', updateCharLimit)
        // Llamada a la función para actualizar el límite de caracteres
        updateCharLimit()

        // Actualización del límite de carácteres al cambiar el width
        return () => window.removeEventListener('resize', updateCharLimit)
    }, [])

    // Función para limitar el contenido de texto
    const truncateContent = (text) => {
        // Establecemos límite de caracteres dependiendo del tipo de dato
        const limit = datatype === 'adoptions' ? CHAR_LIMIT_SMALL : charLimit

        // Separar el texto en palabras y recorrerlas para encontrar el límite de caracteres sin cortar palabras completas
        const words = text.split(' ')
        let truncatedText = ''
        for (let word of words) {
            if ((truncatedText + word).length > limit) break
            truncatedText += word + ' '
        }
        // Texto con con puntos suspensivos al final para sugerir más contenido
        return truncatedText.trim() + ' (...)'
    }

    // Función para manejar el clic en el botón de "me gusta"
    const handleLikeClick = (e) => {
        //Utilizamos stop propagation se utiliza para evitar que el evento se propague a su elemento padre, el contenedor principal
        e.stopPropagation()
        // Si el usuario da click en el boton de like, se cambia el estado de isLiked a su valor contrario (true o false)  sumando o restando el like
        setIsLiked(!isLiked)
    }

    // Estilos vinculados al tipo de datos "adoptions"
    const adoptionsStyles = {
        cardContainer:
            'bg-white items-center w-[330px] h-[auto] pb-9 flex flex-col  shadow-md cursor-pointer hover:scale-102 transition-transform duration-300',
        contentContainer: 'flex flex-col justify-center items-start w-[85%]',
        title: 'w-full h-[18px] text-left pt-8 pb-6 mb-1 font-inter font-bold text-[18px]',
        subtitle: 'w-full text-left font-inter text-[15px]',
        additionalInfo: 'w-full text-left font-inter text-[15px]',
        adoptionsAuthor: 'w-full text-left font-inter text-[15px] mb-2',
        content: 'w-full text-left font-inter pt-1 text-[15px] mb-2',
        image: 'w-[85%] h-[200px] object-cover rounded-md mx-auto',
        showMoreButton:
            'w-[full] h-[40px] bg-[#D0A24C] text-black font-inter font-bold text-[15px] rounded-md mb-2',
    }

    // Estilos vinculados al tipo de datos "posts"
    const postsStyles = {
        cardContainer:
            'bg-white shadow-lg w-[91%] h-[auto] items-center flex flex-row hover:scale-102 transition-transform duration-300',
        contentContainer: 'p-4 flex-col w-[55%] md:w-[60%]',
        title: 'text-black mb-2 font-inter font-bold text-[14px] md:text-[16px] lg:text-[19px]',
        subtitle:
            'text-black font-inter text-[14px] md:text-[12px] lg:text-[15px]',
        content: 'mt-4 text-black text-[13px] md:text-[12px] lg:text-[15px]',
        additionalInfo: 'text-black text-[13px] md:text-[12px] lg:text-[15px]',
        image: 'rounded-md w-[50%] h-[90%] m-3 object-cover md:w-[50%] md:h-[300px] md:ml-auto',
        likeCount:
            'mt-2 flex items-center text-black text-[12px] cursor-pointer lg:text-[13px]',
        showMoreButton:
            'w-[full] h-[40px] bg-[#D0A24C] text-black font-inter font-bold text-[13px] rounded-md mt-2 lg:text-[16px]',
    }

    // Si datatype es igual a 'adoptions' entonces se asignan los estilos de adoptionsStyles, de lo contrario se asignan los estilos de postsStyles
    const styles = datatype === 'adoptions' ? adoptionsStyles : postsStyles

    return (
        <div className={`${styles.cardContainer}`}>
            <div className={`${styles.contentContainer}`}>
                <h1 className={`${styles.title}`}>
                    {datatype === 'adoptions' ? data.name : data.title}
                </h1>
                <h2 className={`${styles.subtitle}`}>
                    {datatype === 'adoptions' ? `${data.age} años` : data.date}
                </h2>
                {datatype === 'adoptions' && (
                    <h2 className={`${styles.additionalInfo}`}>{data.sex}</h2>
                )}
                {datatype === 'posts' && (
                    <p className={`${styles.additionalInfo}`}>
                        Autor: {data.user_id}{' '}
                        {/*Modifico aquí el user id, en principio el name de la tabla users se transforma en user_id*/}
                    </p>
                )}
                {datatype === 'adoptions' && (
                    <p className={`${styles.adoptionsAuthor}`}>
                        Autor: {data.user_id}
                    </p>
                )}
                <p className={`${styles.content}`}>
                    {truncateContent(data.content)}
                </p>
                <MyButton
                    label="Seguir leyendo"
                    className={`${styles.showMoreButton}`}
                    onClick={() =>
                        (window.location.href = `/${datatype}/${data.id}`)
                    }
                />
                {datatype === 'posts' && (
                    <div
                        className={`${styles.likeCount}`}
                        onClick={handleLikeClick}
                    >
                        <motion.img
                            src={like_button}
                            alt="Like button"
                            className="w-4 h-4 mr-2"
                            initial={{ scale: 1 }}
                            animate={{
                                scale: isLiked ? 1.2 : 1,
                                filter: isLiked
                                    ? 'invert(39%) sepia(100%) saturate(3909%) hue-rotate(350deg) brightness(91%) contrast(104%)'
                                    : 'none',
                            }}
                            transition={{ duration: 0.6 }}
                        />
                        <span>
                            {isLiked ? data.like_count + 1 : data.like_count}
                        </span>
                    </div>
                )}
            </div>
            <img
                src={data.url_images}
                alt={datatype === 'adoptions' ? data.name : data.title}
                className={`${styles.image}`}
            />
        </div>
    )
}

export default Card
