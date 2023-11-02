import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ClientOnboarding from "./ClientOnboarding";
import CoachOnboarding from "./CoachOnboarding";

const fetchUserRole = () => {
  // API call to fetch the user's role
  // Return a Promise that resolves to "client" or "coach" for testing purposes
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("client");
    }, 1000);
  });
};

const Onboarding = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    fetchUserRole().then((role) => setUserRole(role));
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
