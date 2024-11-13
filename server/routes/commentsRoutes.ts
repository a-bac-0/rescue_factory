import express from 'express'
import {
    createComment,
    deleteComment,
    getAllComments,
    getOneComment,
    updateComment,
} from '../controllers/commentController'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import { authorizeRole } from '../middleware/authMiddleware'

const commentRouter = express.Router()

commentRouter.get('/', getAllComments)
commentRouter.get('/:id', getOneComment)
// commentRouter.post('/', createComment)
commentRouter.delete('/:id', deleteComment)
commentRouter.put('/:id', updateComment)

export default commentRouter
