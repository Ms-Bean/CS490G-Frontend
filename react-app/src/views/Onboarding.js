import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ClientOnboarding from "../components/ClientOnboarding";
import CoachOnboarding from "../components/CoachOnboarding";

const fetchUserRole = async () => {
  try {
    const response = await fetch("http://localhost:3500/get_role", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error('Error: ' + response.statusText);
    }
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw error;
  }
};

const Onboarding = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    fetchUserRole()
      .then((role) => {
        setUserRole(role);
        console.log(role); // Logs the role after it is fetched
      })
      .catch((error) => console.error('Error fetching user role:', error));
  }, []);

  return (
    // Header
    <Container className="mt-3 p-4 bg-primary text-white rounded w-50 mx-auto">
      <h1 className="mt-2 mb-2 text-center">Profile Details</h1>
      <div className="mt-3">
        <p className="text-center">This is the exercise and coaching app Moxi.</p>
      </div>

      {userRole === "client" && <ClientOnboarding />}
      {userRole === "coach" && <CoachOnboarding />}
    </Container>
  );

  //   if (userRole === "client") {
  //     return <ClientOnboarding />;
  //   } else if (userRole === "coach") {
  //     return <CoachOnboarding />;
  //   } else {
  //     return null;
  //   }
};

export default Onboarding;
