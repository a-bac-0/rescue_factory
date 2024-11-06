import React, { useEffect, useState } from 'react'
import LikeButton from './LikeButton'
import MyButton from '../components/Button'
import { toggleLike } from '../services/PostsServices'

// Constantes para límites de caracteres
const CHAR_LIMIT_SMALL = 70
const CHAR_LIMIT_MEDIUM = 200
const CHAR_LIMIT_LARGE = 320

const Card = ({ datatype, data }) => {
    const [charLimit, setCharLimit] = useState(CHAR_LIMIT_SMALL)
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(data.like_count)

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
        const limit = datatype === 'adoptions' ? CHAR_LIMIT_SMALL : charLimit
        const words = text.split(' ')
        let truncatedText = ''
        for (let word of words) {
            if ((truncatedText + word).length > limit) break
            truncatedText += word + ' '
        }
        return truncatedText.trim() + ' (...)'
    }

    useEffect(() => {
        if (datatype === 'posts') {
            const likedItems = JSON.parse(
                localStorage.getItem('likedItems') || '{}'
            )
            setIsLiked(likedItems[data.id] || false)
        }
        setLikeCount(data.like_count)
    }, [data.id, data.like_count, datatype])

    const handleLikeClick = async (e) => {
        e.stopPropagation()
        if (datatype !== 'posts') return
        const newLikeStatus = !isLiked
        const newLikeCount = newLikeStatus ? likeCount + 1 : likeCount - 1
        try {
            await toggleLike(data.id, newLikeCount)
            setLikeCount(newLikeCount)
            setIsLiked(newLikeStatus)
            const likedItems = JSON.parse(
                localStorage.getItem('likedItems') || '{}'
            )
            if (newLikeStatus) {
                likedItems[data.id] = true
            } else {
                delete likedItems[data.id]
            }
            localStorage.setItem('likedItems', JSON.stringify(likedItems))
        } catch (error) {
            console.error('Error al actualizar el "like"', error)
        }
    }

    // Estilos para los componentes de adopciones
    const adoptionsStyles = {
        cardContainer:
            'bg-white items-center w-[330px] h-[auto] pb-9 flex flex-col shadow-md cursor-pointer hover:scale-102 transition-transform duration-300',
        contentContainer: 'flex flex-col justify-center items-start w-[85%]',
        title: 'w-full h-[18px] text-left pt-8 pb-6 mb-1 font-inter font-bold text-[18px]',
        subtitle: 'w-full text-left font-inter text-[15px]',
        additionalInfo: 'w-full text-left mb-2 font-inter text-[15px]',
        adoptionsAuthor: 'w-full text-left font-inter text-[15px] mb-2',
        content: 'w-full text-left font-inter pt-1 text-[15px] mb-2',
        image: 'w-[85%] h-[200px] object-cover rounded-md mx-auto',
        showMoreButton:
            'w-[full] h-[40px] bg-[#D0A24C] text-black font-inter font-bold text-[15px] rounded-md mb-2',
    }

    // Estilos para los componentes de posts
    const postsStyles = {
        cardContainer:
            'bg-white shadow-lg w-[95%] h-[auto] items-center flex flex-row hover:scale-102 transition-transform duration-300',
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
                <p className={`${styles.adoptionsAuthor}`}>
                    Usuario: {data.user_name}
                </p>
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
                    <LikeButton
                        isLiked={isLiked}
                        likeCount={likeCount}
                        handleLikeClick={handleLikeClick}
                    />
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
