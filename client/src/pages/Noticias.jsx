import React, { useEffect, useState } from 'react'
import newsHeader from '../assets/images/newsHeader.svg'
import Card from '../components/Card'
import FilterOptionsNews from '../components/FilterOptionsNews'
import { useFilter } from '../layout/FilterContext'
import { getPosts } from '../services/PostsServices'
import MyButton from '../components/Button'

const Noticias = () => {
    const [posts, setPosts] = useState([])
    const { filters } = useFilter()

    // Obtener posts al cargar la página por primera vez o al cambiar los filtros de categoría, fecha o likes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsResponse = await getPosts()
                setPosts(postsResponse.data)
            } catch (error) {
                console.error('Error al obtener las noticias:', error)
            }
        }

        fetchData()
    }, [filters])

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
                    <MyButton
                        label="Publicar Noticia"
                        // className={`${styles.showMoreButton}`}
                        // onClick={() =>
                        //     (window.location.href = `/${datatype}/${data.id}`)
                        // }
                    />
                </div>
                <div className="max-w-[1400px] flex flex-col items-center w-[90%] mx-auto">
                    <FilterOptionsNews />
                    <div className="gap-20 grid grid-cols-1 mb-20 w-[93%] justify-items-center">
                        {sortedNews.map((post) => {
                            return (
                                <Card
                                    key={post.id}
                                    datatype="posts"
                                    data={post}
                                    user={{ name: post.user_id }}
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
