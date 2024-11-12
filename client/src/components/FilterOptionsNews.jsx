import React from 'react'
import Select from 'react-select'
import { useFilter } from '../layout/FilterContext'

// Opciones de categorías
const categoryOptions = [
    { label: 'Todas', value: 'Todas' },
    { label: 'Mundo animal', value: 'noticias' },
    { label: 'Cuidado animal', value: 'cuidado_animal' },
    { label: 'Adopciones de éxito', value: 'adopcion' },
]

// Opciones de likes
const likeOptions = [
    { label: 'Más likes', value: 'des' },
    { label: 'Menos likes', value: 'asc' },
]

// Opciones de fecha
const dateOptions = [
    { label: 'Más recientes', value: 'Más recientes' },
    { label: 'Menos recientes', value: 'Menos recientes' },
]

const FilterOptions = () => {
    const { filters, handleSelectChange } = useFilter()

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'transparent',
            border: '2px solid #D1B85E',
            borderRadius: '0.375rem',
            boxShadow: 'none',
            minHeight: '0',
            cursor: 'pointer',
            '&:hover': {
                borderColor: '#B19A36',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#FFF7E6' : '#FFF7E6',
            color: '#31442C',
            '&:hover': {
                backgroundColor: '#FFE8A1',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#F5F5F5',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#FFF7E6',
            borderRadius: '0.375rem',
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            backgroundColor: '#D1B85E',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#D1B85E',
        }),
    }

    return (
        <div className="p-4 w-[95%] mx-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex mb-16 flex-col space-y-4 sm:space-y-0 sm:flex-row w-full sm:gap-7">
                <Select
                    name="category"
                    value={filters.category}
                    options={categoryOptions}
                    onChange={(selectedOption) =>
                        handleSelectChange('category', selectedOption)
                    }
                    styles={customStyles}
                    className="w-full"
                    placeholder="Categoría"
                />
                <Select
                    name="date"
                    value={filters.date}
                    options={dateOptions}
                    onChange={(selectedOption) =>
                        handleSelectChange('date', selectedOption)
                    }
                    styles={customStyles}
                    className="w-full"
                    placeholder="Fecha"
                />
                <Select
                    name="like_count"
                    value={filters.like_count}
                    options={likeOptions}
                    onChange={(selectedOption) =>
                        handleSelectChange('like_count', selectedOption)
                    }
                    styles={customStyles}
                    className="w-full"
                    placeholder="Likes"
                />
            </div>
        </div>
    )
}

export default FilterOptions
