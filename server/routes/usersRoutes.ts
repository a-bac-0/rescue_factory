import express from 'express'
import {
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
    createUser,
} from '../controllers/userController'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import { authorizeRole } from '../middleware/authMiddleware'

const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.get('/:id', getUserById)
userRouter.delete('/:id', deleteUser)
userRouter.put('/:id', updateUser)
userRouter.post('/', createUser)

export default userRouter
