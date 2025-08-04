import {useSession} from "../context/SessionContext.jsx";

import Header from "../components/layout/Header.js";
import Footer from "../components/layout/Footer.js";

const HomePage = () => {
    const { user } = useSession()

    return <>
        <Header />
        <div className="container container-md mx-auto bg-white rounded-lg shadow-md px-10 py-12 flex flex-col w-full mt-30">
            <h2 className="text-gray-900 text-2xl font-bold text-center w-full capitalize">Dashboard</h2>
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
            </div>
        </div>
        <Footer />
    </>
};

export default HomePage;