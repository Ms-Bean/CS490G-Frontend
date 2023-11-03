import React, { useState } from "react";
import { Container, Alert} from "react-bootstrap";
import RegisterField from "../components/RegisterField";

const RegisterPage = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  return (
    <>
      <Container className="mt-3 p-4 bg-primary text-white rounded w-50 mx-auto">
        <h1 className="mt-2 mb-2 text-center">Sign Up</h1>
        <div className="mt-3">
          <p className="text-center">This is the exercise and coaching app Moxi. Sign up for an account below.</p>
        </div>
        {alertMessage && (
          <Alert variant={alertType} dismissible onClose={() => setAlertMessage(null)} className="mt-3 w-50 mx-auto">
            {alertMessage}
          </Alert>
        )}
        <RegisterField setAlertMessage={setAlertMessage} setAlertType={setAlertType} />
      </Container>
    </>
  );
};

export { RegisterPage };
