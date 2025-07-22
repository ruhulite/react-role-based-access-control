import {useSession} from "../../context/SessionContext.jsx";

const QuizList = ({items, itemDelete, editItem, viewOnly}) => {
    const { user } = useSession()

    const handleEdit = (id) => {
        editItem(id);
    }

    const handleDelete = (id) => {
        itemDelete(id)
    }


    return <>
        {items.map((item, index) => (
            <div
                key={item.id || index}
                className="capitalize p-3 flex items-center gap-3 border-b-1 border-gray-200"
            >
                <div className="w-full">
                    <h3 className="w-full text-lg font-bold">{item.title}</h3>
                    <p className="w-full text-sm">{item.description}</p>
                </div>
                {(user.permissions.includes('Can edit') && !viewOnly) && (
                    <button
                        className="bg-green-700 py-1 px-2 rounded-sm text-white text-xs cursor-pointer hover:bg-green-900"
                        onClick={() => handleEdit(item.id)}
                    >Edit</button>
                )}
                {(user.permissions.includes('Can delete') && !viewOnly) && (
                    <button
                        className="bg-red-700 py-1 px-2 rounded-sm text-white text-xs cursor-pointer hover:bg-red-900"
                        onClick={() => handleDelete(item.id)}
                    >Delete</button>
                )}
            </div>
        ))}
    </>
};

export default QuizList;