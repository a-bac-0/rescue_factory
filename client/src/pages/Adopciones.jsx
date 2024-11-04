import React, { useState, useEffect } from 'react'
import HeaderAdoptions from '../assets/images/Header_adoptions.svg'
import Card from '../components/Card'
import FilterOptionsAdoptions from '../components/FilterOptionsAdoptions'
import { useFilter } from '../layout/FilterContext'
import { getAdoptions } from '../services/AdoptionsServices'
import MyButton from '../components/Button'

const Adopciones = () => {
    const [adoptions, setAdoptions] = useState([])
    const { filters } = useFilter()

    // Obtener adoptions al cargar la página por primera vez o al cambiar los filtros de tipo, sexo o edad
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsResponse = await getAdoptions()
                setAdoptions(postsResponse.data)
            } catch (error) {
                console.error('Error al obtener las noticias:', error)
            }
        }

        fetchData()
    }, [filters])

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
                    <MyButton
                        label="Publicar Adopción"
                        className=" w-[28%]"
                        // onClick={() =>
                        //     (window.location.href = `/${datatype}/${data.id}`)
                        // }
                    />
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
                            <p className="text-gray-600 text-lg w-[75%] flex items-start">
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
