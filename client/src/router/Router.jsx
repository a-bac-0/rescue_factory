import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import Adopciones from '../pages/Adopciones.jsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'adopciones',
                element: <Adopciones />,
            },
            {
                path: 'noticias',
                element: <Noticias />,
            },
            {
                path: 'contacto',
                element: <Contacto />,
            },
            {
                path: 'registro',
                element: <Registro />,
            },
            {
                path: 'historiasDeAdopcion',
                element: <HistoriasDeAdopción />,
            },
        ],
    },
])
