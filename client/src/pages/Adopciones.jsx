import React from 'react'
import HeaderAdoptions from '../assets/images/Header_adoptions.svg'
import Card from '../components/Card'
import FilterOptionsAdoptions from '../components/FilterOptionsAdoptions'
import { useFilter } from '../layout/FilterContext'
import Carousel from '../components/Carousel'

const Adopciones = () => {
    const adoptions = [
        {
            id: '1',
            name: 'Nube',
            age: '2',
            sex: 'Hembra',
            category: 'Perros',
            content: 'Sed ut perspiciatis unde omnis iste natus...',
            url_images:
                'https://madagascarmascotas.com/blog/wp-content/uploads/2021/10/calcular-la-edad-de-un-perro.jpg',
        },
        {
            id: '2',
            name: 'Firulais',
            age: '5',
            sex: 'Macho',
            category: 'Gatos',
            content: 'A friendly and playful cat waiting for a loving home.',
            url_images:
                'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.jpg?w=1900&h=1267',
        },
        {
            id: '3',
            name: 'Luna',
            age: '3',
            sex: 'Hembra',
            category: 'Perros',
            content: 'An energetic dog looking for a family.',
            url_images:
                'https://madagascarmascotas.com/blog/wp-content/uploads/2021/10/calcular-la-edad-de-un-perro.jpg',
        },
        {
            id: '4',
            name: 'Toby',
            age: '4',
            sex: 'Macho',
            category: 'Perros',
            content: 'Loves playing fetch and cuddling.',
            url_images:
                'https://madagascarmascotas.com/blog/wp-content/uploads/2021/10/calcular-la-edad-de-un-perro.jpg',
        },
        {
            id: '5',
            name: 'Mimi',
            age: '1',
            sex: 'Hembra',
            category: 'Gatos',
            content: 'A playful kitten looking for a family.',
            url_images:
                'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.jpg?w=1900&h=1267',
        },
        {
            id: '6',
            name: 'Rocco',
            age: '6',
            sex: 'Macho',
            category: 'Perros',
            content: 'Loves to go for long walks.',
            url_images:
                'https://madagascarmascotas.com/blog/wp-content/uploads/2021/10/calcular-la-edad-de-un-perro.jpg',
        },
        {
            id: '7',
            name: 'Pelusa',
            age: '3',
            sex: 'Hembra',
            category: 'Gatos',
            content: 'A sweet cat who loves to be petted.',
            url_images:
                'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.jpg?w=1900&h=1267',
        },
        {
            id: '8',
            name: 'Max',
            age: '7',
            sex: 'Macho',
            category: 'Perros',
            content: 'A loyal companion and friend.',
            url_images:
                'https://madagascarmascotas.com/blog/wp-content/uploads/2021/10/calcular-la-edad-de-un-perro.jpg',
        },
        {
            id: '9',
            name: 'Nina',
            age: '4',
            sex: 'Hembra',
            category: 'Gatos',
            content: 'A fluffy cat who loves to nap.',
            url_images:
                'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.jpg?w=1900&h=1267',
        },
        {
            id: '10',
            name: 'Rocky',
            age: '5',
            sex: 'Macho',
            category: 'Perros',
            content: 'Enjoys playing with children.',
            url_images:
                'https://madagascarmascotas.com/blog/wp-content/uploads/2021/10/calcular-la-edad-de-un-perro.jpg',
        },
        {
            id: '11',
            name: 'Mika',
            age: '3',
            sex: 'Hembra',
            category: 'Gatos',
            content: 'A curious cat who loves to explore.',
            url_images:
                'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.jpg?w=1900&h=1267',
        },
        {
            id: '12',
            name: 'Charlie',
            age: '8',
            sex: 'Macho',
            category: 'Perros',
            content: 'An old soul who enjoys quiet moments.',
            url_images:
                'https://madagascarmascotas.com/blog/wp-content/uploads/2021/10/calcular-la-edad-de-un-perro.jpg',
        },
    ]
    const { filters } = useFilter()

    const filteredAdoptions = adoptions.filter((adoption) => {
        const matchesCategory =
            filters.category.value === 'Todas' ||
            adoption.category === filters.category.value

        const matchesSex =
            filters.sex.value === 'Cualquiera' ||
            adoption.sex === filters.sex.value

        const matchesAge =
            filters.age.value === 'Cualquiera' ||
            (filters.age.value === '1 a 4 años' &&
                adoption.age >= 1 &&
                adoption.age <= 4) ||
            (filters.age.value === '4 a 8 años' &&
                adoption.age > 4 &&
                adoption.age <= 8) ||
            (filters.age.value === 'Más de 8 años' && adoption.age > 8)

        return matchesCategory && matchesSex && matchesAge
    })

    return (
        <div className="min-h-screen w-full object-cover m-0 bg-[#76816A]">
            <img
                src={HeaderAdoptions}
                alt="Header Adoptions"
                className="w-full h-auto"
            />
            <div className="flex items-center flex-col mb-26 mt-6 w-full lg:mt-0">
                <div className="w-[80%] mb-28">
                    <h1 className="font-inter text-5xl font-bold text-white mb-5 lg:text-7xl">
                        ADOPTA
                    </h1>
                    <p className="font-inter text-lg text-white lg:text-2xl">
                        En nuestra protectora, estamos comprometidos con
                        brindarte la oportunidad de cambiar una vida. Cada perro
                        y gato que encontrarás aquí está esperando un hogar
                        amoroso y una familia que lo cuide. Nuestro equipo se
                        asegura de que todos los animales estén sanos, vacunados
                        y listos para ser parte de tu hogar. Adopta y dale una
                        segunda oportunidad a un ser lleno de cariño.
                    </p>
                </div>
                <div className="flex justify-start w-[80%]">
                    <h1 className="font-inter relative top-[1.5vh] text-6xl font-bold text-left text-customGreen mb-0 lg:text-9xl lg:top-[2.5vh]">
                        NUESTROS
                        <br />
                        PELUDOS
                    </h1>
                </div>
            </div>
            <div className="h-auto pt-10 pb-10 bg-customGreen mt-0">
                <div className="max-w-[1400px] mx-auto w-[90%]">
                    <FilterOptionsAdoptions />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                        {filteredAdoptions.length > 0 ? (
                            filteredAdoptions.map((adoption) => (
                                <Card
                                    key={adoption.id}
                                    datatype="adoptions"
                                    data={adoption}
                                    className="w-full"
                                />
                            ))
                        ) : (
                            <p className="text-gray-600 text-lg">
                                No hay adopciones disponibles con los filtros
                                seleccionados.
                            </p>
                        )}
                    </div>
                    <Carousel datatype="adoptions" />
                </div>
            </div>
        </div>
    )
}

export default Adopciones
