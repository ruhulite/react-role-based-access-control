import {useEffect, useState} from "react";
import api from "../../service/api.js";

const QuizForm = ({editId, onSubmitData}) => {
    const [quizData, setQuizData] = useState({
        title: '',
        description: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editId) {
            api.get('/quizes').then((response) => {
                const item = response.data.find(item => item.id === editId);
                setQuizData(item);
            }).catch((error) => {
                console.log(error);
                setError(error);
            })
        }
    }, [editId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmitData(quizData)
        setQuizData({
            title: '',
            description: ''
        })
    }

    return <form
        className="rounded-lg shadow-md w-md pb-6 mx-auto pl-6 pr-6 pt-5 mt-6"
        onSubmit={handleSubmit}
    >
        <h2 className="text-gray-900 text-lg text-center font-bold w-full capitalize mb-6">Add Quiz</h2>
        {error && (<p className="text-red-500 text-center text-sm mb-3">{error}</p>)}
        <div className="mb-4">
            <p className="text-gray-600 text-sm font-bold mb-2">Quiz Title</p>
            <input
                type="text"
                className="w-full p-2 border rounded capitalize"
                value={quizData.title}
                onChange={(e) => setQuizData({...quizData, title: e.target.value})}
                placeholder="Quiz Title"
                required
            />
        </div>
        <div className="mb-4">
            <p className="text-gray-600 text-sm font-bold mb-2">Quiz Description</p>
            <textarea
                className="w-full p-2 border rounded capitalize"
                value={quizData.description}
                onChange={(e) => setQuizData({...quizData, description: e.target.value})}
                placeholder="Quiz Description"
                required
            />
        </div>
        <div className="mb-4">
            <button
                className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer"
                type="submit"
            >
                {editId ? 'Update Quiz' : 'Add Quiz'}
            </button>
        </div>
    </form>
};

export default QuizForm;