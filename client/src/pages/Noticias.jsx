import React, { useEffect, useState } from 'react'
import newsHeader from '../assets/images/newsHeader.svg'
import Card from '../components/Card'
import FilterOptionsNews from '../components/FilterOptionsNews'
import { useFilter } from '../layout/FilterContext'
import { getUsers } from '../services/UsersServices'
import { getPosts } from '../services/PostsServices'

const Noticias = () => {
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const { filters } = useFilter()

    // Obtener usuarios y posts al cargar la página por primera vez o al cambiar los filtros de categoría, fecha o likes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await getUsers()
                setUsers(usersResponse.data)
            } catch (error) {
                console.error('Error al obtener los usuarios:', error)
            }

            try {
                const postsResponse = await getPosts()
                setPosts(postsResponse.data)
            } catch (error) {
                console.error('Error al obtener las noticias:', error)
            }
        }

        fetchData()
    }, [])

    // Filtrar posts según las opciones seleccionadas
    const filteredNews = posts.filter((post) => {
        const matchesCategory =
            filters.category.value === 'Todas' ||
            post.category === filters.category.value
        return matchesCategory
    })

    // Ordenar posts
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
                src={newsHeader}
                alt="Header Noticias"
                className="w-full h-auto"
            />
            <div className="flex flex-col items-center mt-6 w-full lg:mt-0">
                <div className="w-[80%] mb-20">
                    <h1 className="font-inter text-5xl font-bold text-white mb-5 lg:text-7xl">
                        NOTICIAS
                    </h1>
                </div>
                <div className="max-w-[1400px] flex flex-col items-center w-[90%] mx-auto">
                    <FilterOptionsNews />
                    <div className="gap-20 grid grid-cols-1 mb-20 w-[93%] justify-items-center">
                        {sortedNews.map((post) => {
                            const user = users.find(
                                (user) => user.name === post.user_name
                            )
                            return (
                                <Card
                                    key={post.id}
                                    datatype="posts"
                                    data={post}
                                    user={user}
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
