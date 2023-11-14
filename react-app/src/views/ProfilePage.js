import React, { useState, useEffect } from "react";
import ClientProfile from "../components/ClientProfile";
import CoachProfile from "../components/CoachProfile";

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

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-fluid justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <span className={`nav-link ${view === "client" ? "active" : ""}`} onClick={() => handleViewChange("client")}>
                Member Profile
              </span>
            </li>
            {type === "coach" && (
              <li className="nav-item mx-2">
                <span className={`nav-link ${view === "coach" ? "active" : ""}`} onClick={() => handleViewChange("coach")}>
                  Trainer Profile
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div className="mt-2 col-md-5 container">
        {view === "client" && (
          <>
            <div className="d-flex justify-content-center">
              <h1 className="m-2">Member Profile</h1>
            </div>
            <ClientProfile />
          </>
        )}
        {view === "coach" && (
          <>
            <div className="d-flex justify-content-center">
              <h1 className="m-2">Trainer Profile</h1>
            </div>
            <CoachProfile />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
