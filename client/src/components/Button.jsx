import React from "react";

const MyButton = ({ label, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={`w-[auto] h-[auto]  ${className} bg-[#d1b85e] rounded-lg border-2 border-neutral-100 justify-center items-center gap-2.5 inline-flex text-[#31442c] font-bold font-['Inter'] leading-normal hover:bg-[#d6c99e] transition duration-300focus:outline-none focus:ring focus:ring-neutral-100 active:bg-[#d1b85e]`}
        >
            {label}
        </button>
    )
}

export default MyButton