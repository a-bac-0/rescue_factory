import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Adopciones from '../pages/Adopciones';
import Home from '../pages/Home';
import Noticias from '../pages/Noticias';
import Contacto from '../pages/Contacto';
import Register from '../components/forms/Register';
import Login from '../components/forms/Login';
import Article from '../pages/Article';
import PrivacyPolicy from '../pages/Privacidad';


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
                element: <Register />,
            },
            {
                path: 'login',
                element: <Login/>,
            },
            {
                path: 'privacypolicy',
                element: <PrivacyPolicy />,
            },
            {
                path: ':type/:id',
                element: <Article />,
            },
        ],
    },
]);
