import React from 'react'

const CHAR_LIMIT = 80

const Card = ({ datatype }) => {
    const adoptions = {
        id: '1',
        name: 'Nube',
        age: '2 años',
        sex: 'Hembra',
        content:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, dicta sunt explicabo.',
        url_images:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwyXeKDN29AmZgZPLS7n0Bepe8QmVappBwZCeA3XWEbWNdiDFB',
    }

    const posts = {
        id: '101',
        title: 'Noticias del día',
        date: '2024-10-27',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
        url_images:
            'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/15665/production/_107435678_perro1.jpg.webp',
    }

    const data = datatype === 'adoptions' ? adoptions : posts

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

    // Función para redirigir a la página con el anuncio completo
    const handleCardClick = () => {
        window.location.href = `/${datatype}/${data.id}`
    }

    return (
        <div
            onClick={handleCardClick}
            className="bg-white items-center w-[314px] h-[435px] flex flex-col rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
        >
            <div className="flex flex-col justify-center items-center w-[85%]">
                <h1 className="w-full h-[18px] text-left pt-8 pb-10 font-inter font-bold text-[18px]">
                    {datatype === 'adoptions' ? data.name : data.title}
                </h1>
                <h2 className="w-full text-left font-inter text-[15px]">
                    {datatype === 'adoptions' ? data.age : data.date}
                </h2>
                {datatype === 'adoptions' && (
                    <h2 className="w-full text-left font-inter text-[15px]">
                        {data.sex}
                    </h2>
                )}
                <p className="w-full text-left font-inter pt-1 text-[15px]">
                    {truncateContent(data.content)}
                </p>
            </div>
            <img
                src={data.url_images}
                alt={datatype === 'adoptions' ? data.name : data.title}
                className="w-[85%] h-[200px] object-cover rounded-md mt-4"
            />
        </div>
    )
}

export default Card
