import React from 'react'
import Select from 'react-select'
import { useFilter } from '../layout/FilterContext'

// Opciones de categorías
const categoryOptions = [
    { label: 'Todas', value: 'Todas' },
    { label: 'Perros', value: 'Perros' },
    { label: 'Gatos', value: 'Gatos' },
]

// Opciones de edad
const ageOptions = [
    { label: 'Cualquiera', value: 'Cualquiera' },
    { label: '1 a 4 años', value: '1 a 4 años' },
    { label: '4 a 8 años', value: '4 a 8 años' },
    { label: 'Más de 8 años', value: 'Más de 8 años' },
]

// Opciones de sexo
const sexOptions = [
    { label: 'Cualquiera', value: 'Cualquiera' },
    { label: 'Hembra', value: 'Hembra' },
    { label: 'Macho', value: 'Macho' },
]

const FilterOptions = () => {
    const { filters, handleSelectChange } = useFilter()

    // Estilos selects
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#FFFFFF',
            borderColor: '#e5e7eb',
            borderRadius: '0.375rem',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#A8A8A8',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#e2e8f0' : 'white',
            color: state.isSelected ? '#334155' : '#4b5563',
            '&:hover': {
                backgroundColor: '#cbd5e1',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#4b5563',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'white',
            borderRadius: '0.375rem',
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
        }),
    }

    return (
        <div className="p-4 w-[90%] mx-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Select
                name="category"
                value={filters.category}
                options={categoryOptions}
                onChange={(selectedOption) =>
                    handleSelectChange('category', selectedOption)
                }
                styles={customStyles}
                className="w-full sm:w-48"
            />
            <Select
                name="age"
                value={filters.age}
                options={ageOptions}
                onChange={(selectedOption) =>
                    handleSelectChange('age', selectedOption)
                }
                styles={customStyles}
                className="w-full sm:w-48"
            />
            <Select
                name="sex"
                value={filters.sex}
                options={sexOptions}
                onChange={(selectedOption) =>
                    handleSelectChange('sex', selectedOption)
                }
                styles={customStyles}
                className="w-full sm:w-48"
            />
        </div>
    )
}

export default FilterOptions
