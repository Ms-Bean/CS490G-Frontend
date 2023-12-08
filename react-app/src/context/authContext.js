import { createContext, useReducer, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user : action.payload }
        case 'LOGOUT' : 
            return { user : null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });
    const [isLoading, setIsLoading] = useState(true);

    const { setItem } = useLocalStorage();

    // Define the backend URL
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3500';

    useEffect(() => { // Check if user is logged in
        fetch(`${backendUrl}/check_session`, {
            credentials: "include",
        })
        .then(res => res.json())
        .then(data => {
            if (data.user) {
                setItem(data.user);
                dispatch({ type: 'LOGIN', payload: data.user });
            }
            setIsLoading(false);
        });
    }, [backendUrl]); // Dependency array to re-run effect if backendUrl changes

    return (
        <AuthContext.Provider value={{ ...state, dispatch, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
