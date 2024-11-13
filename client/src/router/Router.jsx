import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import Adopciones from '../pages/Adopciones.jsx'
import Home from '../pages/Home.jsx'
import Noticias from '../pages/Noticias.jsx'
import Contacto from '../pages/Contacto.jsx'
import Registro from '../components/forms/Registro.jsx'
import Article from '../pages/Article.jsx'
import LoginForm from '../components/forms/Login.jsx'

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
                element: <LoginForm />,
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
                path: ':type/:id',
                element: <Article />,
            },
        ],
    },
])
