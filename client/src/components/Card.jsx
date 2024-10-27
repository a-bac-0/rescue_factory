import React from 'react'

const CHAR_LIMIT = 80

const Card = () => {
    // Función para recortar el texto sin cortar palabras
    const truncateContent = (text) => {
        if (text.length <= CHAR_LIMIT) {
            return text
        }

        const words = text.split(' ')
        let truncatedText = ''
        for (let word of words) {
            if ((truncatedText + word).length > CHAR_LIMIT) {
                break
            }
            truncatedText += word + ' '
        }

        return truncatedText.trim() + '...'
    }

    return (
        <div className="bg-white items-center w-[314px] h-[435px] flex flex-col rounded-md shadow-md">
            <div className="flex flex-col justify-center items-center w-[85%]">
                <h1 className="w-full h-[18px] text-left pt-8 pb-4 font-inter font-bold text-[18px] ">
                    NUBE
                </h1>
                <h2 className="w-full text-left font-inter pt-3 text-[15px]">
                    Edad
                </h2>
                <h2 className="w-full text-left font-inter pt-1 text-[15px]">
                    Sexo
                </h2>
                <p className="w-full text-left font-inter pt-1 text-[15px]">
                    {truncateContent(
                        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, dicta sunt explicabo.'
                    )}
                </p>
            </div>
        </div>
    )
}

export default Card
