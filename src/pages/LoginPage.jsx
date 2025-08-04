import LoginForm from "../components/LoginForm.jsx";
import { useSession } from "../context/SessionContext.jsx";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import Header from "../components/layout/Header.js";
import Footer from "../components/layout/Footer.js";

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

    return <>
        <Header />
        <div className="container container-md mx-auto px-2 flex flex-col w-full items-center mt-30">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
        <Footer />
    </>
};

export default LoginPage;