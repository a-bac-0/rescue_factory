import express from 'express'
import {
    createAdoption,
    deleteAdoption,
    getAdoptions,
    getOneAdoption,
    updateAdoption,
} from '../controllers/adoptionController'
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware'
import { authorizeRole } from '../middleware/authMiddleware'

const adoptionRouter = express.Router()

adoptionRouter.get('/', getAdoptions)
adoptionRouter.get('/:id', getOneAdoption)
adoptionRouter.post('/', createAdoption)
adoptionRouter.delete('/:id', deleteAdoption)
adoptionRouter.put('/:id', updateAdoption)

export default adoptionRouter
