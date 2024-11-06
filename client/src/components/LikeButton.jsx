// LikeButton.jsx
import React from 'react'
import { motion } from 'framer-motion'
import like_button from '../assets/images/like_button.svg'

const LikeButton = ({ isLiked, likeCount, handleLikeClick }) => {
    return (
        <div
            className="flex items-center text-black text-[12px] cursor-pointer lg:text-[13px]"
            onClick={handleLikeClick}
        >
            <motion.img
                src={like_button}
                alt="Like button"
                className="w-4 h-4 mr-2"
                initial={{ scale: 1 }}
                animate={{
                    scale: isLiked ? 1.2 : 1,
                    filter: isLiked
                        ? 'invert(39%) sepia(100%) saturate(3909%) hue-rotate(350deg) brightness(91%) contrast(104%)'
                        : 'none',
                }}
                transition={{ duration: 0.6 }}
            />
            <span>{likeCount}</span>
        </div>
    )
}

export default LikeButton
