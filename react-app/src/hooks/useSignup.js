import { useAuth } from "./useAuth";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";

const url = "http://localhost:3500/";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { dispatch } = useAuth();
  const { setItem } = useLocalStorage();

  const signup = async (formData, userRole) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await fetch(`${url}insert_user/`, {
        method: "POST",
        headers: {
          // Moved data to body instead of headers
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: userRole,
          street_address: formData.street_address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zip_code,
        }),
        credentials: "include", // Include credentials with the request
      });
      const data = await response.json();

      if (response.ok) {
        const username = formData.username;
        //save the user to local storage
        setItem("user", JSON.stringify({ username }));

        //update the auth context
        dispatch({ type: "LOGIN", payload: username });

        setIsLoading(false);
      } else {
        setErrorMessage(data.message);
        console.error("Error occurred during Signup:", response.status);
      }
    } catch (err) {
      setErrorMessage("The backend is down. Please try again later.");
      console.log(err);
    }
  };

  return { signup, isLoading, errorMessage };
};
