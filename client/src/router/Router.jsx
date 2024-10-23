import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import Adopciones from '../pages/Adopciones.jsx'
import Home from '../pages/Home.jsx'
import Noticias from '../pages/Noticias.jsx'
import Contacto from '../pages/Contacto.jsx'
import Registro from '../pages/Registro.jsx'
import HistoriasDeAdopciones from '../pages/HistoriasDeAdopciones.jsx'

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
                element: <Registro />,
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
                element: <HistoriasDeAdopciones />,
            },
        ],
    },
])
