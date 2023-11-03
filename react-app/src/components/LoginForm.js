import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("danger");
  const {login, errorMessage, isLoading} = useLogin();
  const {user} = useAuth();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(formData.username, formData.password);

  };

  return (
    <>
      {errorMessage && (
        <Alert className="mb-3 mt-3 w-50 mx-auto" variant={alertType} dismissible onClose={() => setAlertMessage(null)}>
          {errorMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={formData.username} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={formData.password} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="forgot">
          <p className="small">
            <a className="text-primary" href="#">
              Forgot password?
            </a>
          </p>
        </Form.Group>
        <div className="d-grid">
          <Button size="lg" variant="primary" type="submit">
            Sign In
          </Button>
        </div>
      </Form>
      {user && <Navigate to='/'/>}
    </>
  );
};

export default LoginForm;