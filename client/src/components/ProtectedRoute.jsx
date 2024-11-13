// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { isAuthenticated, user } = useUserContext()

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute
