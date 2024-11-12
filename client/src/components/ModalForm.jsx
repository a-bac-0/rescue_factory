import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { X } from 'lucide-react'
import { createPost, updatePost } from '../services/PostsServices'
import { createAdoption, updateAdoption } from '../services/AdoptionsServices'

const ModalForm = ({ onClose, formType, initialData = null }) => {
    // Inicialización dependiendo del tipo de dato (posts o adoptions)
    const [formData, setFormData] = useState(
        formType === 'posts'
            ? {
                  title: '',
                  content: '',
                  category: 'Mundo_animal',
                  url_images: '',
                  user_id: 1,
                  like_count: 0,
                  date: new Date().toISOString().split('T')[0],
              }
            : {
                  name: '',
                  content: '',
                  category: 'Perros',
                  url_images: '',
                  age: '',
                  sex: 'Macho',
                  user_id: 1,
                  date: new Date().toISOString().split('T')[0],
              }
    )

    // Estado imagen cargada
    const [imageFile, setImageFile] = useState(null)

    // Estado para manejar el estado de carga
    const [loading, setLoading] = useState(false)

    // Inicialización con datos existentes
    useEffect(() => {
        if (initialData) {
            const relevantData =
                formType === 'posts'
                    ? {
                          title: initialData.title,
                          content: initialData.content,
                          category: initialData.category,
                          url_images: initialData.url_images,
                          user_id: initialData.user_id,
                          like_count: initialData.like_count,
                          date: initialData.date,
                      }
                    : {
                          name: initialData.name,
                          content: initialData.content,
                          category: initialData.category,
                          url_images: initialData.url_images,
                          age: initialData.age,
                          sex: initialData.sex,
                          user_id: initialData.user_id,
                          date: initialData.date,
                      }
            setFormData(relevantData)
        }
    }, [initialData, formType])

    // Definición de categorías para cada tipo de formulario
    const postCategories = [
        { label: 'Mundo animal', value: 'Mundo_animal' },
        { label: 'Cuidado animal', value: 'Cuidado_animal' },
        { label: 'Adopciones de éxito', value: 'Adopciones_exito' },
    ]

    const adoptionCategories = [
        { label: 'Perros', value: 'Perros' },
        { label: 'Gatos', value: 'Gatos' },
    ]

    // Opciones de sexo para las adopciones
    const sexOptions = [
        { label: 'Macho', value: 'Macho' },
        { label: 'Hembra', value: 'Hembra' },
    ]

    // Función para manejar cambios en los campos de entrada del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Función para manejar cambios en el archivo de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImageFile(file)
    }

    // Función para cargar la imagen a Cloudinary
    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'your_upload_preset') // Modificar para conectar a cloudinary

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', // Modificar con enlace a cloudinary
                formData
            )
            return response.data.secure_url
        } catch (error) {
            console.error('Error uploading image:', error)
            throw error
        }
    }

    // Función para el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let imageUrl = formData.url_images
            if (imageFile) {
                imageUrl = await uploadImageToCloudinary(imageFile)
            }
            // Creación un objeto con los datos del formulario
            const dataToSubmit = {
                ...formData,
                url_images: imageUrl,
            }
            if (formType === 'posts') {
                // Si es un formulario de publicación, crea o actualiza la publicación
                const postData = {
                    title: dataToSubmit.title,
                    content: dataToSubmit.content,
                    category: dataToSubmit.category,
                    url_images: dataToSubmit.url_images,
                    user_id: dataToSubmit.user_id,
                    like_count: dataToSubmit.like_count,
                    date: dataToSubmit.date,
                }
                if (initialData) {
                    await updatePost(initialData.id, postData) // Actualiza la publicación si existe
                } else {
                    await createPost(postData) // Crea una nueva publicación
                }
            } else {
                // Si es un formulario de adopción, crea o actualiza la adopción
                const adoptionData = {
                    name: dataToSubmit.name,
                    content: dataToSubmit.content,
                    category: dataToSubmit.category,
                    url_images: dataToSubmit.url_images,
                    age: dataToSubmit.age,
                    sex: dataToSubmit.sex,
                    user_id: dataToSubmit.user_id,
                    date: dataToSubmit.date,
                }
                if (initialData) {
                    await updateAdoption(initialData.id, adoptionData) // Actualiza la adopción si existe
                } else {
                    await createAdoption(adoptionData) // Crea una nueva adopción
                }
            }
            onClose()
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#76816A] rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                        {initialData
                            ? formType === 'posts'
                                ? 'Actualizar Noticia'
                                : 'Actualizar Adopción'
                            : formType === 'posts'
                            ? 'Nueva Noticia'
                            : 'Nueva Adopción'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {formType === 'posts' ? (
                        <div>
                            <label className="block mb-2 font-inter font-bold">
                                Título
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded bg-[#D1B85E]"
                                required
                            />
                        </div>
                    ) : (
                        <div>
                            <label className="block mb-2 font-inter font-bold">
                                Nombre del animal
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded bg-[#D1B85E]"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label className="block mb-2 font-inter font-bold">
                            Categoría
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded bg-[#D1B85E]"
                        >
                            {(formType === 'posts'
                                ? postCategories
                                : adoptionCategories
                            ).map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-inter font-bold">
                            Imagen
                        </label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full p-2 border rounded bg-[#D1B85E]"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-inter font-bold">
                            Contenido
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full p-2 border rounded bg-[#D1B85E]"
                            required
                        />
                    </div>
                    {formType === 'adoptions' && (
                        <>
                            <div>
                                <label className="block mb-2 font-inter font-bold">
                                    Edad
                                </label>
                                <input
                                    type="text"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded bg-[#D1B85E]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-inter font-bold">
                                    Sexo
                                </label>
                                <select
                                    name="sex"
                                    value={formData.sex}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded bg-[#D1B85E]"
                                >
                                    {sexOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-[#D1B85E] text-white rounded hover:bg-[#B4A94D] transition"
                    >
                        {loading ? 'Cargando...' : 'Guardar'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ModalForm
