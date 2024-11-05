import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAPostsById } from '../services/PostsServices'
import { getAdoptionsById } from '../services/AdoptionsServices'
import { getUsersById } from '../services/UsersServices'

const Article = () => {
    const { id, type } = useParams()
    const [data, setData] = useState({})
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result
                if (type === 'posts') {
                    result = await getAPostsById(id)
                } else if (type === 'adoptions') {
                    result = await getAdoptionsById(id)
                }
                setData(result)

                if (result.userId) {
                    const userResult = await getUsersById(result.userId)
                    setUser(userResult)
                }

                setLoading(false)
            } catch (error) {
                console.error('Error obteniendo los datos:', error)
            }
        }

        fetchData()
    }, [id, type])

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <div>
            <img
                src={data.url_images}
                alt="Imagen Artículo"
                className="w-full h-auto"
            />
            <h1 className="font-inter text-5xl font-bold text-white mb-5 lg:text-7xl">
                {type === 'adoptions' ? data.name : data.title}
            </h1>
            {type === 'adoptions' && (
                <>
                    <p className="font-inter text-lg text-white mb-5 lg:text-2xl">
                        Edad: {data.age}
                    </p>
                    <p className="font-inter text-lg text-white mb-5 lg:text-2xl">
                        Sexo: {data.sex}
                    </p>
                </>
            )}
            <p className="font-inter text-lg text-white mb-5 lg:text-2xl">
                Fecha: {data.date ? data.date : 'No disponible'}
            </p>
            <p className="font-inter text-lg text-white mb-5 lg:text-2xl">
                Usuario: {user.name ? user.name : 'Anónimo'}
            </p>
        </div>
    )
}

export default Article
