import UserPermissionForm from "../../components/admin/UserPermissionForm.jsx";
import api from "../../service/api.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const AdminPermissionPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get('/users').then((response) => {
            setUserData(response.data)
        }).catch(error => {
            console.log(error);
            setError('Something went wrong');
        });
    }, []);


    const handleSubmitSuccess = async (val) => {
        await api.put(`/users/${val.id}`, val.data).then(() => {
            setMessage(`Item updated successfully`);
            setError('');
            navigate('/admin')
        }).catch(error => {
            console.log('error', error);
            setError("There is something went wrong");
            setMessage('')
        });
    }
    return <div className="flex flex-col w-full items-center">
        <UserPermissionForm
            onSubmitSuccess={handleSubmitSuccess}
            userData={userData}
            error={error}
            message={message}
        />
        <button
            className="bg-blue-600 py-3 px-5 rounded mt-6 text-white w-60 cursor-pointer mt-20"
            onClick={() => navigate('/')}
        >Back to Admin Panel</button>
    </div>

};

export default AdminPermissionPage;