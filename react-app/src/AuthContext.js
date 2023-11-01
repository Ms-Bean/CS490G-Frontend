import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => { // Check if user is logged in
    fetch("http://localhost:3500/check_session", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        console.log("useEffect: User state in AuthContext.js:", user);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("useEffect: Local storage:", localStorage.getItem("user"));
      });
  }, []);

  const logout = async () => {
    const response = await fetch("http://localhost:3500/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      setUser(null);
      localStorage.removeItem("user");
      return true;
    } else {
      console.error("Error occurred during logout:", response.status);
      return false;
    }
  };

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
};
