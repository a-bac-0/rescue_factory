import React from 'react'
import newsHeader from '../assets/images/newsHeader.svg'
import Card from '../components/Card'
import FilterOptionsNews from '../components/FilterOptionsNews'
import { useFilter } from '../layout/FilterContext'

const Noticias = () => {
    const posts = [
        {
            id: '1',
            title: 'Aventura en la Selva',
            date: '2023-10-01',
            content:
                'Una increíble historia sobre el rescate de animales en la selva...',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 30,
            category: 'Mundo_animal',
        },
        {
            id: '2',
            title: 'Historias de Adopción',
            date: '2023-09-15',
            content:
                'Conoce las historias de aquellos que encontraron un hogar...',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 40,
            category: 'Adopciones _exito',
        },
        {
            id: '3',
            title: 'Consejos de Cuidado Animal',
            date: '2023-09-20',
            content:
                'Tips y trucos para cuidar de tus mascotas y mejorar su calidad de vida...',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 2,
            category: 'Cuidado_animal',
        },
        {
            id: '4',
            title: 'El Impacto del Cuidado Animal',
            date: '2023-08-30',
            content:
                'Reflexiones sobre cómo el cuidado de los animales afecta a la sociedad...',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 1200,
            category: 'Cuidado_animal',
        },
        {
            id: '5',
            title: 'Nuevas Especies Descubiertas',
            date: '2023-09-10',
            content:
                'Explorando nuevas especies que se han encontrado en el Amazonas...',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 100,
            category: 'Mundo_animal',
        },
        {
            id: '6',
            title: 'Historias de Rescate',
            date: '2023-09-05',
            content:
                'Los valientes rescates de animales que conmueven a todos...',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 85,
            category: 'Adopciones_exito',
        },
        {
            id: '7',
            title: 'Cómo Educar a Tu Mascota',
            date: '2023-08-25',
            content:
                'Consejos para la educación y el entrenamiento de tu mascota...',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 60,
            category: 'Cuidado_animal',
        },
        {
            id: '8',
            title: 'El Cuidado de Fauna Silvestre',
            date: '2023-08-15',
            content:
                'Importancia del cuidado y la preservación de la fauna silvestre...',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 45,
            category: 'Mundo_animal',
        },
    ]

    const { filters } = useFilter()

    // Filtrar posts según las opciones seleccionadas
    const filteredNews = posts.filter((post) => {
        const matchesCategory =
            filters.category.value === 'Todas' ||
            post.category === filters.category.value

        // Ya no necesitamos filtrar por likes aquí, solo ordenaremos después
        return matchesCategory
    })

    // Ordenar posts
    const sortedNews = filteredNews.sort((a, b) => {
        // Ordenar por fecha
        if (filters.date.value === 'Más recientes') {
            return new Date(b.date) - new Date(a.date)
        } else if (filters.date.value === 'Menos recientes') {
            return new Date(a.date) - new Date(b.date)
        }

        // Ordenar por likes
        if (filters.like_count.value === 'des') {
            return b.like_count - a.like_count // Más likes primero
        } else if (filters.like_count.value === 'asc') {
            return a.like_count - b.like_count // Menos likes primero
        }

        return 0
    })

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
                    <FilterOptionsNews />
                    <div className="gap-6  mb- justify-items-center">
                        {sortedNews.map((post) => (
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
