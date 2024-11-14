import express from 'express'
import {
    createPost,
    deletePost,
    getPostById,
    getPosts,
    updatePost,
    updateLike,
} from '../controllers/postController'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import { authorizeRole } from '../middleware/authMiddleware'

const postRouter = express.Router()

postRouter.get('/', getPosts)
postRouter.get('/:id', getPostById)
postRouter.post('/', upload.single('url_images'), createPost)
postRouter.delete('/:id', deletePost)
postRouter.put('/:id', updatePost)
postRouter.put('/:id/like', updateLike)

export default postRouter
