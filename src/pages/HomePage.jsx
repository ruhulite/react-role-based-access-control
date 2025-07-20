import {useEffect, useState} from 'react';
import api from "../service/api.js";
import {useNavigate} from "react-router-dom";
import {useSession} from "../context/SessionContext.jsx";
import QuizForm from "../components/admin/QuizForm.jsx";
import QuizList from "../components/admin/QuizList.jsx";

const HomePage = () => {
    const navigate = useNavigate();
    const { user, logout } = useSession()

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [editId, setEditId] = useState(null);

    const getData = () => {
        api.get('/quizes').then((response) => {
            setItems(response.data);
        }).catch((error) => {
            console.log(error);
            setError(error);
        })
    }

    useEffect( () => {
        getData();
    }, []);

    const handleAddDataSubmit = (item) => {
        // console.log(item);
        // setItems([...items, item]);

        api.post('/quizes', item).then(() => {
            setMessage(`Item added successfully`);
            setEditId(null);
            setError('');
            getData();
        }).catch(error => {
            console.log('error', error);
            setError("There is something went wrong");
            setMessage('')
        });
    }

    const handleEditDataSubmit = (item) => {
        // console.log(item);
        // setItems([...items, item]);

        api.put(`/quizes/${editId}`, item).then(() => {
            setMessage(`Item updated successfully`);
            setEditId(null);
            setError('');
            getData();
        }).catch(error => {
            console.log('error', error);
            setError("There is something went wrong");
            setMessage('')
        });
    }

    const handleEditItem = (id) => {
        setEditId(id);
    }

    const handleDeleteItem = async (id) => {
        await api.delete(`/quizes/${id}`).then((response) => {
            const itemDelete = items.filter((item) => item.id !== response.data.id);
            setItems(itemDelete);
            setMessage('Item deleted Successfully');
        }).catch((error) => {
            console.log(error);
            setError(error);
            setMessage(null);
        })
    }

    const handleLogout = () => {
        logout(user);
        navigate('/login');
    }

    return <div className="container container-md mx-auto px-2 flex flex-col w-full items-center h-screen">
        <div className="bg-white rounded-lg shadow-md mx-w-300 p-4 mt-10">
            <h2 className="text-gray-900 text-2xl font-bold w-full capitalize">Quiz Builder Application</h2>
            <hr className="text-gray-200 mt-6" />
            <div className="flex gap-2">
                <h2 className="flex items-center text-gray-900 text-lg font-bold w-full capitalize">Welcome {user.username}</h2>
                {/*{user.role && (*/}
                {/*    <button*/}
                {/*        className="bg-blue-600 py-3 px-5 rounded my-6 text-white cursor-pointer m-0"*/}
                {/*        onClick={() => navigate('/admin-login')}*/}
                {/*    >Admin Permission</button>*/}
                {/*)}*/}
                <button
                    className="bg-blue-600 py-3 px-5 rounded my-6 text-white cursor-pointer m-0"
                    onClick={() => navigate('/admin-permission')}
                >Admin Permission</button>
                <button
                    className="bg-red-600 py-3 px-5 rounded my-6 text-white cursor-pointer m-0"
                    onClick={handleLogout}
                >Logout</button>
            </div>
            {error && (<p className="text-red-500 text-center text-sm mb-3 mt-4">{error}</p>)}
            {message && (<p className="text-green-600 text-center text-sm mb-3 mt-4">{message}</p>)}
            <hr className="text-gray-200 mt-6" />
            {editId ? (
                <QuizForm onSubmitData={handleEditDataSubmit} editId={editId} />
            ) : (
                <QuizForm onSubmitData={handleAddDataSubmit} />
            )}
            <hr className="text-gray-200 mt-6" />
            <div className="w-full pt-3">
                <QuizList items={items} itemDelete={handleDeleteItem} editItem={handleEditItem} />
            </div>
        </div>
    </div>
};

export default HomePage;