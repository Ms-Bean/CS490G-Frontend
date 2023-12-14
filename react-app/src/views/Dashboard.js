import React, {useState,useEffect} from "react";
import { Container, Card, Button } from "react-bootstrap";
import ClientDashboard from "../components/Dashboard";
import CoachRequest from '../components/Admin/CoachRequest'
import { config } from "./../utils/config";

const Dashboard = () => {
  const [type, setType] = useState(null);

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


  return (
    <>
      {type === "admin" ? 
      <CoachRequest/>
      :
      <ClientDashboard/>
      }
    </>
  );
};

export default Dashboard;
