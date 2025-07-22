import React, {useEffect, useState} from 'react';
import api from "../service/api.js";
import {useNavigate} from "react-router-dom";
import {useSession} from "../context/SessionContext.jsx";
import QuizList from "../components/admin/QuizList.jsx";

const HomePage = () => {
    const navigate = useNavigate();
    const { user, logout } = useSession()

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    useEffect( () => {
        api.get('/quizes').then((response) => {
            setItems(response.data);
        }).catch((error) => {
            console.log(error);
            setError(error);
        })
    }, []);

    const handleLogout = () => {
        logout(user);
        navigate('/login');
    }

    return <div className="container container-md mx-auto px-2 flex flex-col w-full items-center h-screen">
        <div className="bg-white rounded-lg shadow-md mx-w-300 p-4 mt-10">
            <h2 className="text-gray-900 text-2xl font-bold text-center w-full capitalize">Quiz Builder Application</h2>
            <hr className="text-gray-200 mt-6" />
            <div className="flex items-start gap-2">
                <div className="w-full mt-4">
                    <h2 className="flex items-center text-gray-900 text-lg font-bold w-full capitalize">Welcome, {user.username}</h2>
                    <p className="flex items-center text-gray-900 text-sm w-full capitalize">
                        <label className="font-bold">Role:&nbsp;</label>{user.role}
                    </p>
                    <p className="flex items-center text-gray-900 text-sm w-full capitalize">
                        <label className="font-bold">Permission:&nbsp;</label>{user.permissions.length > 1 ? user.permissions.map(permission => permission).join(', ') : user.permissions[0]}
                    </p>
                </div>
                {(user.role === "Super Admin" || user.role === "Admin") && (
                    <button
                        className="bg-blue-600 py-3 px-5 rounded mt-6 text-white w-60 cursor-pointer m-0"
                        onClick={() => navigate('/admin')}
                    >Admin Panel</button>
                )}
                <button
                    className="bg-red-600 py-3 px-5 rounded my-6 text-white cursor-pointer m-0"
                    onClick={handleLogout}
                >Logout</button>
            </div>
            <hr className="text-gray-200 mt-6" />
            {error && (<p className="text-red-500 text-center text-sm mb-3 mt-4">{error}</p>)}
            <div className="w-full pt-3">
                <QuizList items={items} viewOnly={true} />
            </div>
        </div>
    </div>
};

export default HomePage;