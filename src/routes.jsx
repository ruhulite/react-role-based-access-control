import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import AdminPermission from "./pages/admin/AdminPermission.jsx";

export const routes = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
        errorElement: <ErrorPage />
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <HomePage />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/admin-permission',
                element: <AdminPermission />,
                errorElement: <ErrorPage />,
            }
        ]
    }
])