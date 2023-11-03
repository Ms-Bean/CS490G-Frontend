import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Spinner, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useSignup } from "../hooks/useSignup";

// Main registration form containing form logic and fields
const RegisterField = ({ setAlertMessage, setAlertType }) => {
    const [userRole, setUserRole] = useState("client");
    const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: ""
    });

    const {user} = useAuth();
    const {signup, isLoading, errorMessage} = useSignup();
  
    const roles = [
      { name: "Coach", value: "coach" },
      { name: "Client", value: "client" },
    ];
  
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData({ ...formData, [id]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Submitting form data:", formData);
      console.log("User role:", userRole);

      await signup(formData, userRole);

      if(errorMessage){
        setAlertMessage(errorMessage);
        setAlertType('danger')
      }

    };
  
    return (
      <Container className="mt-3 form-background justify-content-center">
        <Row className="bg-light text-dark rounded p-4">
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
  
              <Form.Group className="mb-3 d-grid" controlId="role">
                <Form.Label>Select Role</Form.Label>
                <ButtonGroup className="mb-3">
                  {roles.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      size="lg"
                      id={`radio-${idx}`}
                      type="radio"
                      variant="outline-primary"
                      name="radio"
                      value={radio.value}
                      checked={userRole === radio.value}
                      onChange={(e) => setUserRole(e.target.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Form.Group>
  
              <div className="d-grid">
                <Button size="lg" variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        {user && <Navigate to='/onboard'/>}
      </Container>
    );
  };

  export default RegisterField;