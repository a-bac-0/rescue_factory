import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { createPost, updatePost } from '../services/PostsServices'
import { createAdoption, updateAdoption } from '../services/AdoptionsServices'

const ModalForm = ({ onClose, formType, initialData = null }) => {
    const [formData, setFormData] = useState(
        formType === 'posts'
            ? {
                  title: '',
                  content: '',
                  category: 'Mundo_animal',
                  url_images: '',
                  user_id: 1,
                  like_count: 0,
                  date: new Date(),
              }
            : {
                  name: '',
                  content: '',
                  category: 'Perros',
                  url_images: '',
                  age: '',
                  sex: 'Macho',
                  user_id: 1,
                  date: new Date(),
              }
    )

    const [imageFile, setImageFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState('')
    const [charCount, setCharCount] = useState(0)
    const [showValidation, setShowValidation] = useState(false)

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
            setCharCount(relevantData.content.length)
            validateContent(relevantData.content)
        }
    }, [initialData, formType])

    const validateContent = (content) => {
        if (content.length < 300) {
            setValidationError(
                'El contenido debe tener al menos 300 caracteres'
            )
            return false
        } else if (content.length > 700) {
            setValidationError(
                'El contenido no puede exceder los 700 caracteres'
            )
            return false
        } else {
            setValidationError('')
            return true
        }
    }

    const postCategories = [
        { label: 'Mundo animal', value: 'noticias' },
        { label: 'Cuidado animal', value: 'cuidado_animal' },
        { label: 'Adopciones de éxito', value: 'adopciones' },
    ]

    const adoptionCategories = [
        { label: 'Perros', value: 'Perros' },
        { label: 'Gatos', value: 'Gatos' },
    ]

    const sexOptions = [
        { label: 'Macho', value: 'Machos' },
        { label: 'Hembra', value: 'Hembras' },
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        if (name === 'content') {
            setCharCount(value.length)
            setValidationError('')
            if (showValidation) {
                validateContent(value)
            }
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImageFile(file)
    }

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'ml_default')
        formData.append('cloud_name', 'dri2o7vsv')

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dri2o7vsv/image/upload',
                formData
            )
            return response.data.secure_url
        } catch (error) {
            console.error('Error uploading image:', error)
            throw error
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowValidation(true)

        if (!validateContent(formData.content)) {
            return
        }

        setLoading(true)

        try {
            let imageUrl = formData.url_images
            if (imageFile) {
                imageUrl = await uploadImageToCloudinary(imageFile)
            }

            const dataToSubmit = {
                ...formData,
                url_images: imageUrl,
            }

            let updatedData
            if (formType === 'posts') {
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
                    updatedData = await updatePost(initialData.id, postData)
                } else {
                    updatedData = await createPost(postData)
                }
            } else {
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
                    updatedData = await updateAdoption(
                        initialData.id,
                        adoptionData
                    )
                } else {
                    updatedData = await createAdoption(adoptionData)
                }
            }

            onClose(updatedData)
        } catch (error) {
            if (error.response) {
                // La solicitud se hizo y el servidor respondió con un código de estado fuera del rango 2xx
                console.error('Error uploading image:', error.response.data)
                alert(
                    `Error al subir la imagen: ${error.response.data.error.message}`
                )
            } else if (error.request) {
                console.error('Error uploading image:', error.request)
                alert(
                    'Hubo un problema de conexión al subir la imagen. Inténtalo de nuevo.'
                )
            } else {
                console.error('Error uploading image:', error.message)
                alert(
                    'Hubo un error desconocido al subir la imagen. Inténtalo de nuevo más tarde.'
                )
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#76816A] border rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-black">
                        {initialData
                            ? formType === 'posts'
                                ? 'Actualizar Noticia'
                                : 'Actualizar Adopción'
                            : formType === 'posts'
                            ? 'Nueva Noticia'
                            : 'Nueva Adopción'}
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {formType === 'posts' ? (
                        <div>
                            <label className="block mb-2 font-inter font-bold text-black">
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
                            <label className="block mb-2 font-inter font-bold text-black">
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
                        <label className="block mb-2 font-inter font-bold text-black">
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
                            ).map((category) => (
                                <option
                                    key={category.value}
                                    value={category.value}
                                >
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {formType === 'adoptions' && (
                        <>
                            <div>
                                <label className="block mb-2 font-inter font-bold text-black">
                                    Edad
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded bg-[#D1B85E]"
                                    required
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-inter font-bold text-black">
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

                    <div className="space-y-1">
                        <label className="block mb-2 font-inter font-bold text-black">
                            Contenido
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            className={`w-full p-2 border rounded bg-[#D1B85E] ${
                                showValidation && validationError
                                    ? 'border-red-500'
                                    : ''
                            }`}
                            rows="6"
                            required
                        ></textarea>
                        <div className="flex justify-between items-center mt-1">
                            {showValidation && validationError && (
                                <p className="text-sm text-red-500">
                                    {validationError}
                                </p>
                            )}
                            <div className="ml-auto text-sm text-black">
                                {charCount} / 700
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 font-inter font-bold text-black">
                            Imagen
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-2 border rounded bg-[#D1B85E]"
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={
                                loading ||
                                (showValidation && validationError !== '')
                            }
                            className="px-4 py-2 bg-[#D1B85E] text-black rounded hover:bg-[#77633D] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading
                                ? 'Guardando...'
                                : initialData
                                ? 'Actualizar'
                                : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalForm
