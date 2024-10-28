import { createContext, useState } from 'react'

const FilterContext = createContext()

export const FilterProvider = ({ children }) => {
    const [selectedType, setSelectedType] = useState('Todas')
    const [selectedAge, setSelectedAge] = useState('empty')
    const [selectedSex, setSelectedSex] = useState('empty')

    const handleSelectChange = (selectedOption, action) => {
        switch (action.name) {
            case 'Type':
                setSelectedType(selectedOption.value)
                break
            case 'Age':
                setSelectedAge(selectedOption.value)
                break
            case 'Sex':
                setSelectedSex(selectedOption.value)
                break
            default:
                break
        }
    }

    return (
        <FilterContext.Provider
            value={{
                selectedType,
                selectedAge,
                selectedSex,
                handleSelectChange,
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}

export default FilterContext
