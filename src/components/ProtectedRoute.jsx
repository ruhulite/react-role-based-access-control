import {Navigate, Outlet} from "react-router-dom";
import { useSession } from "../context/SessionContext.jsx";

export const ProtectedRoute = () => {
    const { isLoggedIn, loading } = useSession();
    if (loading) {
        return <div>loading..</div>
    }
    return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />;
}