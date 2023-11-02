import React, { useEffect, useState } from "react";
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
}

const Onboarding = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    fetchUserRole().then((role) => setUserRole(role));
  }, []);

  if (userRole === "client") {
    return <ClientOnboarding />;
  } else if (userRole === "coach") {
    return <CoachOnboarding />;
  } else {
    return null;
  }
};

export default Onboarding;