
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem("access_token");
    return (
        token ? children : <Navigate to="/login" />
    )
}
