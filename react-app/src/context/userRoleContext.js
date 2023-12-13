import React, { createContext, useState, useEffect } from "react";
import { config } from "./../utils/config";

export const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/get_role`, {
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
