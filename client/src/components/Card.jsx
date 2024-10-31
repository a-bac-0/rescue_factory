import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import like_button from '../assets/images/like_button.svg'

// Constantes para límites de caracteres
const CHAR_LIMIT_SMALL = 70
const CHAR_LIMIT_MEDIUM = 200
const CHAR_LIMIT_LARGE = 320

const Card = ({ datatype, data }) => {
    const [charLimit, setCharLimit] = useState(CHAR_LIMIT_SMALL)
    const [isLiked, setIsLiked] = useState(false)

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

        window.addEventListener('resize', updateCharLimit)
        updateCharLimit()

        return () => window.removeEventListener('resize', updateCharLimit)
    }, [])

    const truncateContent = (text) => {
        if (text.length <= charLimit) return text

        const words = text.split(' ')
        let truncatedText = ''
        for (let word of words) {
            if ((truncatedText + word).length > charLimit) break
            truncatedText += word + ' '
        }
        return truncatedText.trim() + '...'
    }

    const handleCardClick = () => {
        window.location.href = `/${datatype}/${data.id}`
    }

    const handleLikeClick = (e) => {
        e.stopPropagation()
        setIsLiked(!isLiked)
    }

    const adoptionsStyles = {
        cardContainer:
            'bg-white items-center w-[314px] h-[410px] flex flex-col rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform duration-300',
        contentContainer: 'flex flex-col justify-center items-center w-[85%]',
        title: 'w-full h-[18px] text-left pt-8 pb-10 font-inter font-bold text-[18px]',
        subtitle: 'w-full text-left font-inter text-[15px]',
        additionalInfo: 'w-full text-left font-inter text-[15px]',
        content: 'w-full text-left font-inter pt-1 text-[15px] mb-6',
        image: 'w-[85%] h-[200px] object-cover rounded-md mx-auto',
    }

    const postsStyles = {
        cardContainer:
            'bg-white shadow-lg w-[91%] h-[auto] items-center flex flex-row hover:shadow-2xl w-full rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform duration-300',
        contentContainer: 'p-4 flex-col w-[55%] md:w-[60%]',
        title: 'text-black mb-2 font-inter font-bold text-[13px] md:text-[16px] lg:text-[18px]',
        subtitle:
            'text-black font-inter text-[10px] md:text-[12px] lg:text-[14px]',
        content: ' mt-4 text-black text-[10px] md:text-[12px] lg:text-[14px]',
        additionalInfo: 'text-black text-[10px] md:text-[12px] lg:text-[14px]',
        image: 'rounded-md w-[45%] h-[90%] m-3 object-cover md:w-[50%] md:h-[300px] md:ml-auto',
        likeCount: 'mt-2 flex items-center text-black text-[12px]',
    }

    const styles = datatype === 'adoptions' ? adoptionsStyles : postsStyles

    return (
        <div onClick={handleCardClick} className={`${styles.cardContainer}`}>
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
                        Autor: {data.user_name}
                    </p>
                )}
                <p className={`${styles.content}`}>
                    {truncateContent(data.content)}
                </p>
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
