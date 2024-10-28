import React, { createContext, useContext, useState } from 'react'

// Creamos un contexto para los filtros
const FilterContext = createContext()

// FilterProvider para envolver la aplicación y proveer el contexto de filtros
export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        category: { label: 'Categoría', value: 'Todas' },
        age: { label: 'Edad', value: 'Cualquiera' },
        sex: { label: 'Sexo', value: 'Cualquiera' },
    })

    const handleSelectChange = (name, selectedOption) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: selectedOption,
        }))
    }

    const applyFilters = (data) => {
        let filteredData = [...data]

        // Categoría
        if (filters.category && filters.category.value !== 'Todas') {
            filteredData = filteredData.filter(
                (item) => item.category === filters.category.value
            )
        }

        //  Edad
        if (filters.age && filters.age.value !== 'Cualquiera') {
            filteredData = filteredData.filter((item) => {
                const age = item.age
                switch (filters.age.value) {
                    case '1 a 4 años':
                        return age >= 1 && age <= 4
                    case '4 a 8 años':
                        return age > 4 && age <= 8
                    case 'Más de 8 años':
                        return age > 8
                    default:
                        return true
                }
            })
        }

        // Sexo
        if (filters.sex && filters.sex.value !== 'Cualquiera') {
            filteredData = filteredData.filter(
                (item) => item.sex === filters.sex.value
            )
        }

        return filteredData
    }

    return (
        <FilterContext.Provider
            value={{ filters, handleSelectChange, applyFilters }}
        >
            {children}
        </FilterContext.Provider>
    )
}

// Hook para usar el contexto de filtros
export const useFilter = () => {
    const context = useContext(FilterContext)
    if (!context) {
        throw new Error('useFilter debe ser usado dentro de un FilterProvider')
    }
    return context
}

export default FilterContext