import { createContext, useReducer, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user : action.payload}
        case 'LOGOUT' : 
            return {user : null}
        default:
            return state
    }
}

export const AuthContextProvide = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });
    const [isLoading, setIsLoading] = useState(true);

    const {setItem} = useLocalStorage();

    useEffect(() => { // Check if user is logged in
        fetch("http://localhost:3500/check_session", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
            if(data.user){
                setItem(data.user);
                dispatch({type : 'LOGIN', payload : data.user});
            }
            // console.log("useEffect: User state in AuthContext.js:", data.user);
            // console.log("useEffect: Local storage:", localStorage.getItem("user"));
            setIsLoading(false);
            });
        }, []);

    return(
        <AuthContext.Provider value={{...state, dispatch, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}