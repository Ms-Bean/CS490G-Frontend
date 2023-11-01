import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { AuthContext } from "./AuthContext"; 

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // setUser used to update the AuthContext
  const [loginSuccess, setLoginSuccess] = useState(false);
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
    const response = await fetch("http://localhost:3500/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },  // Updated to json
      body: JSON.stringify(formData),
      credentials: 'include',  // Make sure credentials/cookies are included 
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setUser(data.user);
      setLoginSuccess(true);
    } else {
      console.log("Login failed");
      alert(data.message);
    }
  };

  useEffect(() => { // Check if user is logged in
    if (loginSuccess) {
      navigate("/");
    }
  }, [loginSuccess, navigate]);  // Depend on loginSuccess and navigate
  
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
