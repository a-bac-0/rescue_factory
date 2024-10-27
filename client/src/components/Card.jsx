import React from 'react'

const CHAR_LIMIT = 80

const Card = () => {
    const adoptions = {
        name: 'Nube',
        age: '2 años',
        sex: 'Hembra',
        content:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, dicta sunt explicabo.',
        url_images:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwyXeKDN29AmZgZPLS7n0Bepe8QmVappBwZCeA3XWEbWNdiDFB',
    }

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

    return (
        <div className="bg-white items-center w-[314px] h-[435px] flex flex-col rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col justify-center items-center w-[85%]">
                <h1 className="w-full h-[18px] text-left pt-8 pb-4 font-inter font-bold text-[18px] ">
                    {adoptions.name}
                </h1>
                <h2 className="w-full text-left font-inter pt-3 text-[15px]">
                    {adoptions.age}
                </h2>
                <h2 className="w-full text-left font-inter pb-3 text-[15px]">
                    {adoptions.sex}
                </h2>
                <p className="w-full text-left font-inter pt-1 text-[15px]">
                    {truncateContent(adoptions.content)}
                </p>
            </div>
            <img
                src={adoptions.url_images}
                alt={adoptions.name}
                className="w-[85%] h-[200px] object-cover rounded-md mt-4"
            />
        </div>
    )
}

export default Card
