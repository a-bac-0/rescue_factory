import React from 'react'
import newsHeader from '../assets/images/newsHeader.svg'
import Card from '../components/Card'

const Noticias = () => {
    const posts = [
        {
            id: '1',
            title: 'Lorem ipsum dolor sit amet',
            date: '2021-10-01',
            content:
                'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
        },
        {
            id: '2',
            title: 'Consectetur adipiscing elit',
            date: '2021-10-02',
            content:
                'Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo...',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
        },
        {
            id: '3',
            title: 'Consectetur adipiscing elit',
            date: '2021-10-02',
            content:
                'Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo...',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
        },
    ]

    return (
        <div className="min-h-screen w-full object-cover m-0 bg-[#76816A]">
            <img
                src={newsHeader}
                alt="Header Noticias"
                className="w-full h-auto"
            />
            <div className="flex items-center flex-col mb-26 mt-6 w-full lg:mt-0">
                <div className="w-[80%] mb-28">
                    <h1 className="font-inter text-5xl font-bold text-white mb-5 lg:text-7xl">
                        NOTICIAS
                    </h1>
                </div>
                <div className="max-w-[1400px] mx-auto w-[90%]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {posts.map((post) => (
                            <Card
                                key={post.id}
                                datatype="posts"
                                data={post}
                                className="w-full"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noticias
