import React, { useState, useEffect } from "react";
// import CoachDashboard from "../components/CoachDashboard";
import CoachRequest from '../components/Admin/CoachRequest'
import CoachClientDashboard from "../components/CoachClientDashboard";
import { config } from "./../utils/config";

const ProfilePage = () => {
  const [type, setType] = useState(null);
  //const [view, setView] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/get_role`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Error: " + response.statusText);
        }
        const data = await response.json();
        setType(data.message);
        //return data.message;
      } catch (error) {
        console.error("Error fetching user role:", error);
        throw error;
      }
    };

    fetchUserRole();
  }, []);

  // useEffect(() => {
  //   setView(type); // Set initial view based on the user role
  // }, [type]);

  // const handleViewChange = (newView) => { // Allow changing view only if the user is a coach
  //   if (type === "coach") {
  //     setView(newView);
  //   }
  // };

  // if(type === "coach")
  // {
  //   return (
  //     <CoachDashboard />
  //   );
  // }
  // else
  // {
  //   return (
  //       <h1>You do not have permission to view this page.</h1>
  //   )
  // }
  return(
    <div>
      {type === "admin" ? 
        <CoachRequest/>
      : type === "coach" ?
      <div>
        <CoachClientDashboard/>
      </div>
      :
      <div className="container vh-100 d-flex justify-content-center align-items-center">
          <div className="w-50 d-flex flex-column justify-content-center align-items-center border border-black shadow-lg rounded p-2" >
              <h2>Sorry! You do not have permission to view this page</h2>
              <small>Sign up to be a coach! By signing up as a coach, individuals gain access to exclusive training resources, networking opportunities, and marketing support, while also enjoying benefits of being a client!</small>
          </div>
      </div>
      // <h1>You do not have permission to view this page.</h1>
      }
    </div>
  )

};

export default ProfilePage;
