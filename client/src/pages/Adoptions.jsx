import React from 'react'
import HeaderAdoptions from '../assets/images/Header_adoptions.svg'

const Adoptions = () => {
    return (
        <div className="min-h-screen w-full  object-cover m-0 bg-[#76816A]">
            <img
                src={HeaderAdoptions}
                alt="Header Adoptions"
                className="w-full h-auto"
            />
        </div>
    )
}

export default Adoptions
