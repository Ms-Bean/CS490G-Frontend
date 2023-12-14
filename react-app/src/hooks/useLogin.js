import { useAuth } from "./useAuth";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";
import { config } from "./../utils/config";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { dispatch } = useAuth();
  const { setItem } = useLocalStorage();

  const login = async (username, password) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${config.backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        const user = data.user; 
        setItem("user", JSON.stringify(user));
        dispatch({ type: "LOGIN", payload: user });
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
        console.error("Error occurred during login:", response.status, data.message);
      }
    } catch (err) {
      setErrorMessage("The backend is down or an error occurred. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, errorMessage };
};

export default useLogin;
