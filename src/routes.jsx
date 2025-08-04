import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import AdminPermissionPage from "./pages/admin/AdminPermissionPage.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";

export const routes = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/products',
        element: <ProductsPage />,
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
                path: '/admin',
                element: <AdminPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/admin-permission',
                element: <AdminPermissionPage />,
                errorElement: <ErrorPage />,
            }
        ]
    }
])