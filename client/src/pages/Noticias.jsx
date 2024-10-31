import React from 'react'
import newsHeader from '../assets/images/newsHeader.svg'
import Card from '../components/Card'
import FilterOptionsNews from '../components/FilterOptionsNews'
import { useFilter } from '../layout/FilterContext'

const Noticias = () => {
    const users = [
        {
            id: 1,
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            role: 'admin',
        },
        {
            id: 2,
            name: 'Bob Smith',
            email: 'bob.smith@example.com',
            role: 'editor',
        },
        {
            id: 3,
            name: 'Charlie Brown',
            email: 'charlie.brown@example.com',
            role: 'viewer',
        },
        {
            id: 4,
            name: 'Daisy Miller',
            email: 'daisy.miller@example.com',
            role: 'editor',
        },
        {
            id: 5,
            name: 'Ethan Wright',
            email: 'ethan.wright@example.com',
            role: 'admin',
        },
    ]

    const posts = [
        {
            id: '1',
            title: 'Aventura en la Selva',
            date: '2023-10-01',
            content:
                'En un rincón escondido de la selva, un equipo de rescatistas se aventura entre frondosos árboles y ríos peligrosos para salvar animales en situaciones extremas. Cada rescate se convierte en un testimonio de esperanza y valentía, mostrando cómo el esfuerzo humano puede cambiar vidas. Desde aves exóticas hasta mamíferos heridos, cada especie recupera su libertad, recordándonos la importancia de la conservación natural.',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 30,
            category: 'Mundo_animal',
            user_name: 'Alice Johnson',
        },
        {
            id: '2',
            title: 'Historias de Adopción',
            date: '2023-09-15',
            content:
                'Cuando una familia abre las puertas de su hogar a un animal, nace una historia de amor y compañerismo. Este artículo nos invita a conocer cómo el cariño y el cuidado transforman la vida de quienes encontraron un hogar. Desde perros y gatos hasta animales de granja, cada adopción trae consigo momentos inolvidables, mostrando que, más allá de ser mascotas, se convierten en parte esencial de sus familias.',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 40,
            category: 'Adopciones_exito',
            user_name: 'Bob Smith',
        },
        {
            id: '3',
            title: 'Consejos de Cuidado Animal',
            date: '2023-09-20',
            content:
                'Cuidar de nuestras mascotas va más allá de proporcionar alimento y un lugar para dormir. En este artículo, se comparten consejos y trucos que ayudan a mejorar su calidad de vida, desde una alimentación balanceada hasta la importancia de chequeos veterinarios regulares. Con estos tips, podrás garantizar que tu mascota no solo esté sana, sino también feliz y llena de energía para disfrutar cada día.',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 2,
            category: 'Cuidado_animal',
            user_name: 'Charlie Brown',
        },
        {
            id: '4',
            title: 'El Impacto del Cuidado Animal',
            date: '2023-08-30',
            content:
                'El cuidado de los animales no solo los beneficia a ellos, sino que también impacta en nuestra sociedad. Este artículo explora cómo la responsabilidad hacia el bienestar animal crea comunidades más empáticas y conscientes. Al proteger y cuidar a nuestros compañeros, desde mascotas hasta animales silvestres, fortalecemos valores como el respeto y la compasión, promoviendo un mundo más armonioso.',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 1200,
            category: 'Cuidado_animal',
            user_name: 'Diana Prince',
        },
        {
            id: '5',
            title: 'Nuevas Especies Descubiertas',
            date: '2023-09-10',
            content:
                'Exploradores y biólogos se adentran en las profundidades del Amazonas en busca de vida desconocida, y los descubrimientos no dejan de sorprender. Desde plantas con propiedades medicinales hasta especies animales nunca vistas, cada hallazgo contribuye a la biodiversidad. Este artículo revela cómo estas nuevas especies desafían los conocimientos actuales y brindan esperanza para la investigación y conservación.',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 100,
            category: 'Mundo_animal',
            user_name: 'Elena Gilbert',
        },
        {
            id: '6',
            title: 'Historias de Rescate',
            date: '2023-09-05',
            content:
                'Cada rescate animal representa el compromiso y la dedicación de personas dispuestas a cambiar vidas. Este artículo recoge las historias más conmovedoras de rescates recientes, desde perros y gatos abandonados hasta fauna salvaje en riesgo. A través de estos testimonios, descubrimos cómo el amor y la valentía transforman realidades, y por qué es crucial apoyar estas iniciativas de rescate animal.',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 85,
            category: 'Adopciones_exito',
            user_name: 'Frank Castle',
        },
        {
            id: '7',
            title: 'Cómo Educar a Tu Mascota',
            date: '2023-08-25',
            content:
                'Educar a una mascota es una tarea que requiere paciencia y amor. En este artículo encontrarás estrategias efectivas para enseñar buenos hábitos a tu mascota, desde órdenes básicas hasta rutinas que fortalecen su bienestar emocional. Con consejos adaptados a diferentes tipos de animales y temperamentos, aprenderás a fomentar una convivencia sana, respetuosa y feliz junto a tu compañero de vida.',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 60,
            category: 'Cuidado_animal',
            user_name: 'Gabriel Reyes',
        },
        {
            id: '8',
            title: 'El Cuidado de Fauna Silvestre',
            date: '2023-08-15',
            content:
                'La fauna silvestre enfrenta numerosos desafíos debido a la actividad humana, y su preservación es vital para el equilibrio de los ecosistemas. Este artículo aborda las medidas de cuidado necesarias para proteger a estas especies, explorando desde la educación hasta la conservación de hábitats. Cuidar de la fauna salvaje no solo asegura su supervivencia, sino también la salud de nuestro planeta.',
            url_images:
                'https://s1.abcstatics.com/media/sociedad/2019/10/10/gatosperros1-k8mG--1248x698@abc.jpg',
            like_count: 45,
            category: 'Mundo_animal',
            user_name: 'Hannah Baker',
        },
    ]
    const { filters } = useFilter()

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
