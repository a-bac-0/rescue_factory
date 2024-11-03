import React from 'react'
import HeaderAdoptions from '../assets/images/Header_adoptions.svg'
import Card from '../components/Card'
import FilterOptionsAdoptions from '../components/FilterOptionsAdoptions'
import { useFilter } from '../layout/FilterContext'

const Adopciones = () => {
    const adoptions = [
        {
            id: '1',
            name: 'Nube',
            age: '2',
            sex: 'Hembra',
            category: 'Perros',
            content:
                'Nube es una perra dulce que busca un hogar donde pueda recibir mucho amor y cariño. ¡Es muy juguetona y le encanta salir a pasear!',
            url_images:
                'https://madagascarmascotas.com/blog/wp-content/uploads/2021/10/calcular-la-edad-de-un-perro.jpg',
        },
        {
            id: '2',
            name: 'Firulais',
            age: '5',
            sex: 'Macho',
            category: 'Gatos',
            content:
                'Firulais es un gato amigable y juguetón que espera un hogar amoroso. ¡Siempre está listo para hacerte sonreír!',
            url_images:
                'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.jpg?w=1900&h=1267',
        },
        {
            id: '3',
            name: 'Luna',
            age: '3',
            sex: 'Hembra',
            category: 'Perros',
            content:
                'Luna es una perra energética que busca una familia que le guste jugar y salir a pasear. ¡Es muy cariñosa!',
            url_images:
                'https://madagascarmascotas.com/blog/wp-content/uploads/2021/10/calcular-la-edad-de-un-perro.jpg',
        },
        {
            id: '4',
            name: 'Toby',
            age: '4',
            sex: 'Macho',
            category: 'Perros',
            content:
                'Toby adora jugar a buscar la pelota y acurrucarse con todos. ¡Es el compañero perfecto para cualquier persona!',
            url_images:
                'https://madagascarmascotas.com/blog/wp-content/uploads/2021/10/calcular-la-edad-de-un-perro.jpg',
        },
        {
            id: '5',
            name: 'Mimi',
            age: '1',
            sex: 'Hembra',
            category: 'Gatos',
            content:
                'Mimi es una gatita juguetona que busca una familia. ¡Le encanta jugar y es muy cariñosa con todos!',
            url_images:
                'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.jpg?w=1900&h=1267',
        },
        {
            id: '6',
            name: 'Rocco',
            age: '6',
            sex: 'Macho',
            category: 'Perros',
            content:
                'Rocco adora pasear durante horas y disfrutar de la compañía de su familia. ¡Es un perro muy leal!',
            url_images:
                'https://madagascarmascotas.com/blog/wp-content/uploads/2021/10/calcular-la-edad-de-un-perro.jpg',
        },
        {
            id: '7',
            name: 'Pelusa',
            age: '3',
            sex: 'Hembra',
            category: 'Gatos',
            content:
                'Pelusa es una gata dulce que ama ser acariciada. ¡Te hará compañía mientras te relajas en casa!',
            url_images:
                'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.jpg?w=1900&h=1267',
        },
        {
            id: '8',
            name: 'Max',
            age: '7',
            sex: 'Macho',
            category: 'Perros',
            content:
                'Max es un perro leal y cariñoso que busca un hogar donde pueda dar y recibir amor.',
            url_images:
                'https://madagascarmascotas.com/blog/wp-content/uploads/2021/10/calcular-la-edad-de-un-perro.jpg',
        },
        {
            id: '9',
            name: 'Nina',
            age: '4',
            sex: 'Hembra',
            category: 'Gatos',
            content:
                'Nina es una gata esponjosa que adora dormir. ¡Es la compañera perfecta para las tardes de sofá!',
            url_images:
                'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.jpg?w=1900&h=1267',
        },
        {
            id: '10',
            name: 'Rocky',
            age: '5',
            sex: 'Macho',
            category: 'Perros',
            content:
                'Rocky disfruta jugar con los niños. ¡Es un perro divertido y lleno de energía!',
            url_images:
                'https://madagascarmascotas.com/blog/wp-content/uploads/2021/10/calcular-la-edad-de-un-perro.jpg',
        },
        {
            id: '11',
            name: 'Mika',
            age: '3',
            sex: 'Hembra',
            category: 'Gatos',
            content:
                'Mika es una gata curiosa que ama explorar. ¡Siempre está lista para nuevas aventuras!',
            url_images:
                'https://static.nationalgeographic.es/files/styles/image_3200/public/75552.ngsversion.1422285553360.jpg?w=1900&h=1267',
        },
        {
            id: '12',
            name: 'Charlie',
            age: '8',
            sex: 'Macho',
            category: 'Perros',
            content:
                'Charlie es un alma vieja que disfruta de momentos tranquilos y de la compañía de su familia.',
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
                    <div className="grid grid-cols-1 mb-10 gap-20 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
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
                </div>
            </div>
        </div>
    )
}

export default Adopciones
