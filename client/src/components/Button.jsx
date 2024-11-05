import React from 'react'

const MyButton = ({ label, onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`w-[100%] h-[30px] bg-[#D0A24C] rounded-md text-black font-inter font-bold transition duration-300 ${className} hover:bg-[#D6C99E] focus:outline-none focus:ring focus:ring-neutral-100`}
        >
            {label}
        </button>
    )
}

export default MyButton
