import React, { createContext, useState, useEffect } from "react";

export const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch("http://localhost:3500/get_role", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch role");
        const data = await response.json();
        setRole(data.message);
      } catch (err) {
        // Handle error
      }
    };
    fetchRole();
  }, []);

  return <UserRoleContext.Provider value={{ role, setRole }}>{children}</UserRoleContext.Provider>;
};
