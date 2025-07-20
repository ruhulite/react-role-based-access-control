import {useEffect, useState} from 'react';
import api from "../../service/api.js";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [userDataWIthRole, setUserDataWIthRole] = useState({
        id: '',
        role: ''
    })
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const roles= [
        {
            id: '001',
            name: 'Super Admin'
        },
        {
            id: '002',
            name: 'Admin'
        }
    ];

    useEffect(() => {
        api.get('/users').then((response) => {
            console.log('response', response.data);
            setUserData(response.data)
        }).catch(error => {
            console.log(error);
            setError('Something went wrong');
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const findUser = userData.find(user => user.id === userDataWIthRole.id)

        api.put(`/quizes/${userDataWIthRole.id}`, {
            ...findUser,
            role: userDataWIthRole.role
        }).then(() => {
            setMessage(`Item updated successfully`);
            setError('');
            navigate('/')
        }).catch(error => {
            console.log('error', error);
            setError("There is something went wrong");
            setMessage('')
        });

    }


    return (
        <form
            className="bg-white rounded-lg shadow-sm width-full max-w-sm max-auto pl-6 pr-6 pb-6"
            onSubmit={handleSubmit}
        >
            <div className="pt-6">
                <h2 className="text-3xl text-center font-extralight">
                    Set User and Role
                </h2>
            </div>
            <hr className="text-gray-200 mt-6" />
            <div className="pt-6">
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">User List</label>
                    <select
                        name="user"
                        id="user"
                        value={userDataWIthRole.id}
                        onChange={(e) => setUserDataWIthRole({...userDataWIthRole, id: e.target.value})}
                    >
                        {userData.map((user) => (
                            <option key={user.id} value={user.id}>{user.email}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="text-gray-600 text-sm">Roles</label>
                    <select
                        name="role"
                        id="role"
                        value={userDataWIthRole.id}
                        onChange={(e) => setUserDataWIthRole({...userDataWIthRole, role: e.target.value})}
                    >
                        {roles.map((role) => (
                            <option key={role.id} value={role.name}>{role.name}</option>
                        ))}
                    </select>
                </div>
                {error && (<p className="text-red-500 text-center text-sm mb-3">{error}</p>)}
                {message && (<p className="text-green-600 text-center text-sm mb-3">{message}</p>)}
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer"
                    type="submit"
                >
                    Add Role
                </button>
            </div>
        </form>
    );
};

export default LoginForm;