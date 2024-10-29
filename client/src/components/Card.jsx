import React from 'react'

const CHAR_LIMIT = 80

const Card = ({ datatype, data }) => {
    // Límite de caracteres para el contenido
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

    const handleCardClick = () => {
        window.location.href = `/${datatype}/${data.id}`
    }

    const adoptionsStyles = {
        cardContainer:
            'bg-white items-center w-[314px] h-[435px] flex flex-col rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform duration-300',
        contentContainer: 'flex flex-col justify-center items-center w-[85%]',
        title: 'w-full h-[18px] text-left pt-8 pb-10 font-inter font-bold text-[18px]',
        subtitle: 'w-full text-left font-inter text-[15px]',
        additionalInfo: 'w-full text-left font-inter text-[15px]',
        content: 'w-full text-left font-inter pt-1 text-[15px]',
        image: 'w-[85%] h-[200px] object-cover rounded-md mt-4',
    }

    const postsStyles = {
        cardContainer:
            'bg-white shadow-lg items-center flex flex-row hover:shadow-2xl w-full rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform duration-300',
        contentContainer: 'p-4 flex-col',
        title: 'text-black  font-inter font-bold text-[20px]',
        subtitle: 'text-black font-inter text-[15px]',
        content: 'text-gray-800',
        image: 'rounded-md w-[40%] ',
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
                <p className={`${styles.content}`}>
                    {truncateContent(data.content)}
                </p>
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
