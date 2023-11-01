import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "./AuthContext";

const LoginForm = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("danger");
  const navigate = useNavigate();

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
        navigate("/");
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
    <>
      {alertMessage && (
        <Alert className="mb-3 mt-3" variant={alertType} dismissible onClose={() => setAlertMessage(null)}>
          {alertMessage}
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
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </div>
      </Form>
    </>
  );
};

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <h2 className="mt-5 fw-bold mb-2 text-center">Sign In</h2>
          <div className="mt-3">
            <p className="mb-0  text-center">
              Don't have an account?{" "}
              <a href="{''}" className="text-primary fw-bold">
                Sign Up
              </a>
            </p>
          </div>{" "}
          <Row>
            <Col>
              <LoginForm setUser={setUser} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
