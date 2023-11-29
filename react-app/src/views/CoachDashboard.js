import React, { useState, useEffect } from "react";
import CoachDashboard from "../components/CoachDashboard";

const ProfilePage = () => {
  const [type, setType] = useState(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost:3500/get_role", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Error: " + response.statusText);
        }
        const data = await response.json();
        setType(data.message);
        return data.message;
      } catch (error) {
        console.error("Error fetching user role:", error);
        throw error;
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    setView(type); // Set initial view based on the user role
  }, [type]);

  const handleViewChange = (newView) => { // Allow changing view only if the user is a coach
    if (type === "coach") {
      setView(newView);
    }
  };

  if(type === "coach")
  {
    return (
      <CoachDashboard />
    );
  }
  else
  {
    return (
        <h1>You do not have permission to view this page.</h1>
    )
  }
};

export default ProfilePage;