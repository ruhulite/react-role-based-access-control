import {useState} from 'react';
import {Link} from "react-router-dom";
import api from "../service/api.js";

const LoginForm = ({onLoginSuccess}) => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [existingUser, setExistingUser] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        await api.get('/users').then((response) => {
            const userExists = response.data.find(user => (user.username === userData.username && user.password === userData.password));
            if (!userExists) {
                setError("Username or Password doesn't match");
                setMessage('')
                setUserData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
            } else {
                setIsRegistered(true);
                setUserData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                onLoginSuccess(userExists);
            }
        });
    }

    const handleRegister = async (event) => {
        event.preventDefault();

        await api.get('/users').then((response) => {
            const userExists = response.data.find(user => user.email === userData.email);
            if (userExists) {
                setExistingUser(true);
                setError("User already exist");
                setMessage('')
                setUserData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
            }
        });

        if (!existingUser) {
            api.post('/users', userData).then(() => {
                setIsRegistered(false);
                setMessage('User registration successfully');
                setError('');
                setUserData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
            }).catch(error => {
                console.log('error', error);
                setError("There is something went wrong");
                setMessage('')
            });
        }
    }

    const handleRegisterToggle = () => {
        setIsRegistered(!isRegistered);
    }


    return (
        <form
            className="bg-white rounded-lg shadow-sm width-full max-w-sm max-auto pl-6 pr-6 pb-6"
            onSubmit={isRegistered ? handleRegister : handleLogin}
        >
            <div className="pt-6">
                <h2 className="text-3xl text-center font-extralight">
                    {isRegistered ? 'Create an account' : 'Login'}
                </h2>
            </div>
            <hr className="text-gray-200 mt-6" />
            <div className="pt-6">
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">Username</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded mt-2"
                        value={userData.username}
                        onChange={(e) => setUserData({...userData, username: e.target.value})}
                        placeholder="Username"
                        required
                    />
                </div>
                {isRegistered && (
                    <div className="mb-4">
                        <label className="text-gray-600 text-sm">Email</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded mt-2"
                            value={userData.email}
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                            placeholder="Email"
                            required
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded mt-2"
                        value={userData.password}
                        onChange={(e) => setUserData({...userData, password: e.target.value})}
                        placeholder="Password"
                        required
                    />
                </div>
                {isRegistered && (
                    <div className="mb-4">
                        <label className="text-gray-600 text-sm">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded mt-2"
                            value={userData.confirmPassword}
                            onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                )}
                {error && (<p className="text-red-500 text-center text-sm mb-3">{error}</p>)}
                {message && (<p className="text-green-600 text-center text-sm mb-3">{message}</p>)}
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer"
                    type="submit"
                >
                    {isRegistered ? 'Register' : 'Login'}
                </button>
                <p className="text-gray-600 pt-4 text-center text-sm">
                    {isRegistered ? 'Already have an account?' : "Don't have an account?"}
                    <Link
                        to=""
                        className="text-blue-600"
                        onClick={handleRegisterToggle}
                    >
                        {isRegistered ? ' Login' : ' Create an account'}
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default LoginForm;