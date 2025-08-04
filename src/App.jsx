import './App.css'
import {RouterProvider} from "react-router-dom";
import { routes } from "./routes.jsx";
import {SessionProvider} from "./context/SessionContext.jsx";

function App() {

    return <div className="bg-slate-800 size-full">
        <div className="flex justify-center items-center h-full">
            <SessionProvider>
                <RouterProvider router={ routes } />
            </SessionProvider>
        </div>
    </div>
}

export default App
