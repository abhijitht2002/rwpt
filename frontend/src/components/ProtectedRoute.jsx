import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function ProtectedRoute({ children, roles = [] }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    // not logged in
    if (!user) {
        return <Navigate to="/account/login" replace />;
    }

    // role restriction
    if (roles.length && !roles.includes(user.role)) {
        return <Navigate to="/dashboard/" replace />;
    }

    return children;
}

export default ProtectedRoute;