import LoginForm from "../components/LoginForm.jsx";
import { useSession } from "../context/SessionContext.jsx";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";

const LoginPage = () => {
    const { login, isLoggedIn } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleLoginSuccess = (data) => {
        login(data);
        navigate('/');
    }

    return <LoginForm onLoginSuccess={handleLoginSuccess} />
};

export default LoginPage;