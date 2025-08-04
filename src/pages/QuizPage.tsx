import {useEffect, useState} from "react";
import QuizList from "../components/admin/QuizList.jsx";
import api from "../service/api.js";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const QuizPage = () => {
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

    return <>
        <Header />
        <div className="container container-lg w-full bg-white p-6 rounded-md my-30 ml-auto mr-auto">
            {error && (<p className="text-red-500 text-center text-sm mb-3 mt-4">{error}</p>)}
            <div className="w-full pt-3">
                <QuizList items={items} viewOnly={true} />
            </div>
        </div>
        <Footer />
    </>
};

export default QuizPage;