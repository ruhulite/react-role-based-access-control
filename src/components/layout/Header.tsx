import {Link, useNavigate} from "react-router-dom";
import {useSession} from "../../context/SessionContext"


const Header = () => {
    const { user, isLoggedIn, logout } = useSession();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(user);
        navigate('/login');
    }

    return (
        <div className="bg-white p-3 shadow-md w-full fixed top-0 left-0 h-25 flex items-center justify-between">
            <h1>
                <Link to="/">Logo</Link>
            </h1>
            <ul className="flex justify-center items-center">
                <li className="px-3">
                    <Link
                        to="/products"
                        className="hover:text-gray-600"
                    >Store</Link>
                </li>
                {isLoggedIn && (
                    <li className="px-3"><Link className="hover:text-gray-600" to="/quiz">Quiz</Link></li>
                )}
            </ul>
            {isLoggedIn ? (
                <div className="">
                    {(user.role === "Super Admin" || user.role === "Admin") && (
                        <button
                            className="bg-blue-600 py-2 px-5 rounded mt-6 text-white cursor-pointer m-0 mr-3 text-sm"
                            onClick={() => navigate('/admin')}
                        >Admin Panel</button>
                    )}
                    <button
                        className="bg-red-600 py-2 px-5 rounded my-6 text-white cursor-pointer m-0 text-sm"
                        onClick={handleLogout}
                    >Logout</button>
                </div>
            ) : (
                <Link to="/">Login</Link>
            )}
        </div>
    );
};

export default Header;