import React, { useState, useContext } from "react"; // Import useContext
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { AuthContext } from "./AuthContext"; // Import AuthContext

const LoginPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext); // Destructure setIsLoggedIn
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3500/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },  // Updated to json
      body: JSON.stringify(formData),
      credentials: 'include',  // Make sure credentials/cookies are included 
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true); // Update isLoggedIn to true upon successful login
      navigate("/");
    } else {
      console.log("Login failed");
      alert(data.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
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
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
