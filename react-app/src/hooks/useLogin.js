import { useAuth } from "./useAuth";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";
import { config } from "./../utils/config";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const {dispatch} = useAuth();
    const {setItem} = useLocalStorage();

    const login = async (username, password) => {
        try{
            setIsLoading(true);
            setErrorMessage(null);

            const response = await fetch(`${config.backendUrl}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, password}),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                setItem('user', JSON.stringify({username}));

                dispatch({type: "LOGIN", payload : {username}});

                setIsLoading(false);

            } else {
                setErrorMessage(data.message);
                console.error("Error occurred during login:", response.status);
            }
        } catch(err){
            setErrorMessage("The backend is down. Please try again later.")
            console.log(err);
        }
    };

    return {login, isLoading, errorMessage};
}