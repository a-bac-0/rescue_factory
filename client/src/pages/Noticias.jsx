import React, { useEffect, useState } from 'react'
import newsHeader from '../assets/images/newsHeader.svg'
import newsHeaderDesktop from '../assets/images/newsHeaderDesktop.svg'
import Card from '../components/Card'
import FilterOptionsNews from '../components/FilterOptionsNews'
import { useFilter } from '../layout/FilterContext'
import { getPosts } from '../services/PostsServices'
import { getUsers } from '../services/UsersServices'
import MyButton from '../components/Button'
import ModalForm from '../components/ModalForm'

const Noticias = () => {
    const { filters } = useFilter()
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchData = async () => {
        try {
            const [postsData, usersData] = await Promise.all([
                getPosts(),
                getUsers(),
            ])
            setPosts(postsData)
            setUsers(usersData)
        } catch (error) {
            console.error('Error al obtener los datos:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        fetchData()
    }

    const handleCardUpdate = async (updatedPost) => {
        setPosts((currentPosts) =>
            currentPosts.map((post) =>
                post.id === updatedPost.id ? updatedPost : post
            )
        )
    }

    const filteredNews = posts.filter((post) => {
        const matchesCategory =
            filters.category.value === 'Todas' ||
            post.category === filters.category.value
        return matchesCategory
    })

    const sortedNews = filteredNews.sort((a, b) => {
        if (filters.date.value === 'Más recientes') {
            return new Date(b.date) - new Date(a.date)
        } else if (filters.date.value === 'Menos recientes') {
            return new Date(a.date) - new Date(b.date)
        }

        if (filters.like_count.value === 'des') {
            return b.like_count - a.like_count
        } else if (filters.like_count.value === 'asc') {
            return a.like_count - b.like_count
        }

        return 0
    })

    return (
        <div className="min-h-screen w-full bg-[#76816A]">
            <img
                src={newsHeaderDesktop}
                alt="Header News"
                className="w-full h-auto object-cover hidden md:block"
            />

            <img
                src={newsHeader}
                alt="Header News"
                className="w-full h-auto object-cover block md:hidden"
            />
            <div className="flex flex-col items-center mt-6 w-full lg:mt-0">
                <div className="w-[80%] mb-20">
                    <h1 className="font-inter text-5xl font-bold text-white mb-5 lg:text-7xl">
                        NOTICIAS
                    </h1>
                </div>
                <div className="max-w-[1400px] flex flex-col items-center w-[90%] mx-auto">
                    <FilterOptionsNews />
                    <div className="w-full flex justify-center lg:w-[29,7%] lg:ml-[6vw] sm:justify-start mb-10 ">
                        <MyButton
                            label="Publicar Noticia"
                            className="w-[78vw] p-2 flex sm:w-[30%] items-center mb-10 font-inter font-bold text-black "
                            onClick={handleOpenModal}
                        />
                    </div>
                    {isModalOpen && (
                        <ModalForm
                            onClose={handleCloseModal}
                            formType="posts"
                        />
                    )}
                    <div className="gap-20 grid grid-cols-1 mb-20 w-[93%] justify-items-center">
                        {sortedNews.map((post) => {
                            const user = users.find(
                                (user) => user.id === post.user_id
                            )
                            const postWithUserName = {
                                ...post,
                                user_name: user
                                    ? user.name
                                    : 'Usuario desconocido',
                            }
                            return (
                                <Card
                                    key={post.id}
                                    datatype="posts"
                                    data={postWithUserName}
                                    onUpdate={handleCardUpdate}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noticias
