import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { AuthContext } from "./AuthContext"; // Import AuthContext

const url = "http://localhost:3500/";

// Main registration form containing form logic and fields
const RegisterField = ({ setAlertMessage, setAlertType }) => {
  const { setUser } = useContext(AuthContext); // setUser used to update the AuthContext

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${url}insert_user/`, {
        method: "POST",
        headers: { // Moved data to body instead of headers
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include", // Include credentials with the request
      });
      const data = await response.json();

      // Update alert message and type
      setAlertMessage(data.message);
      setAlertType(response.status !== 200 ? "danger" : "success");

      if (response.status === 200) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/role");
      }
    } catch (err) {
      console.error("Error occurred:", err);

      setAlertMessage("The backend is down right now. Please try again later.");
      setAlertType("danger");
    }

    setIsLoading(false);
  };

  return (
    <Container className="mt-3 form-background d-flex justify-content-center">
      <Row className="w-50 bg-light text-dark rounded p-4">
        <Col>
          <Form onSubmit={handleSubmit}>
            {/* First Name and Last Name Side by Side */}
            <Row className="mb-3">
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control id="first_name" type="text" value={formData.first_name} onChange={handleInputChange} />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control id="last_name" type="text" value={formData.last_name} onChange={handleInputChange} />
              </Col>
            </Row>

            {/* Remaining Fields */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={formData.email} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={formData.username} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={formData.password} onChange={handleInputChange} />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const RegisterPage = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  return (
    <>
      <Container className="mt-3 p-4 bg-primary text-white rounded w-50 mx-auto">
        <h1>Create Account</h1>
        <p>This is the exercise and coaching app Moxi. Create an account below.</p>
      </Container>
      {alertMessage && (
        <Alert variant={alertType} dismissible onClose={() => setAlertMessage(null)} className="mt-3 w-50 mx-auto">
          {alertMessage}
        </Alert>
      )}
      <RegisterField setAlertMessage={setAlertMessage} setAlertType={setAlertType} />
    </>
  );
};

export { RegisterPage };
