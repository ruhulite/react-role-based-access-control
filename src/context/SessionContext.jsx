import {createContext, useContext, useEffect, useState} from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storesUser = JSON.parse(sessionStorage.getItem("user"));
        if (storesUser) {
            setUser(storesUser);
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, []);

    const login = (user) => {
        setUser(user);
        setIsLoggedIn(true);
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    const logout = (data) => {
        if (data) {
            setUser(null);
            setIsLoggedIn(false);
            sessionStorage.removeItem('user');
        }
    }

    return <SessionContext.Provider value={{ login, logout, loading, user, isLoggedIn }}>{children}</SessionContext.Provider>;
}