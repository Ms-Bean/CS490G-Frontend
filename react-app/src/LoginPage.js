import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "./AuthContext";

const LoginForm = ({ setLoginSuccess, setUser, setAlertMessage, setAlertType }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3500/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setLoginSuccess(true);
      } else {
        setAlertMessage(data.message);
        setAlertType("danger");
      }
    } catch (err) {
      console.error(err);
      setAlertMessage("The backend is down. Please try again later.");
      setAlertType("danger");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={formData.username} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={formData.password} onChange={handleInputChange} />
      </Form.Group>
      <Button type="submit">Login</Button>
    </Form>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("danger");

  useEffect(() => {
    if (loginSuccess) navigate("/");
  }, [loginSuccess, navigate]);

  return (
    <Container>
      {alertMessage && (
        <Alert variant={alertType} dismissible onClose={() => setAlertMessage(null)}>
          {alertMessage}
        </Alert>
      )}
      <Row>
        <Col>
          <LoginForm setLoginSuccess={setLoginSuccess} setUser={setUser} setAlertMessage={setAlertMessage} setAlertType={setAlertType} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
