/// <reference path="./types/express.d.ts" />

import express from 'express' // Importa express como un módulo
import connection_db from './database/db' // Importación de la conexión a la base de datos
import commentModel from './models/commentsModel' // Importaciones de modelos
import contactMessageModel from './models/contactModel'
import postModel from './models/postsModel'
import userModel from './models/usersModel'
import adoptionModel from './models/adoptionsModel'
import userRouter from './routes/usersRoutes'
import cors from 'cors'
import postRouter from './routes/postsRoutes'
import commentRouter from './routes/commentsRoutes'
import adoptionRouter from './routes/adoptionsRoutes'
import authRouter from './routes/authRoutes'
import contactRouter from './routes/contactRoutes';
import { verifyTokenMiddleware } from './middleware/verifyTokenMiddleware' // Asegúrate de que la ruta sea correcta

// Crea una instancia de la aplicación express
export const app = express()

//Middelewares
app.use(cors())
app.use(express.json())

//Rutas
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/posts/:postId/comments', commentRouter)
app.use('/adoptions', adoptionRouter)
app.use('/auth', authRouter)
app.use('/contact_messages', contactRouter);

// Función para inicializar la base de datos
const initializeDatabase = async (): Promise<void> => {
    try {
        // Autenticación con la base de datos
        await connection_db.authenticate()
        console.log('The connection to the database has been successful 👍✅')

        // Define los modelos en orden para manejar las dependencias
        const models = [
            { model: userModel, name: 'users' },
            { model: adoptionModel, name: 'adoptions' },
            { model: postModel, name: 'posts' },
            { model: commentModel, name: 'comments' },
            { model: contactMessageModel, name: 'contact_message' },
        ]

        // Sincroniza cada modelo
        for (const { model, name } of models) {
            await model.sync({ force: false })
            console.log(`The ${name} table has been created successfully 👍✅`)
        }
    } catch (error) {
        // Manejo de errores
        if (error instanceof Error) {
            console.error(
                'Unable to connect to the database ❌:',
                error.message
            )
        } else {
            console.error(
                'Unable to connect to the database ❌: An unknown error occurred'
            )
        }
        throw error // Lanza el error para manejarlo más arriba si es necesario
    }
}

// Ejecuta la inicialización de la base de datos
initializeDatabase().catch((error) => {
    console.error('Failed to initialize database:', error)
    process.exit(1) // Sale con un código de error si la inicialización falla
})

export const server = app.listen(8000, () => {
    console.log('Server is working, nice job :) http://localhost:8000')
})
