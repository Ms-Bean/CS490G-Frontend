import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, FormCheck, Dropdown, Spinner, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useSignup } from "../hooks/useSignup";
import { State } from "country-state-city";

// Main registration form containing form logic and fields
const RegisterField = ({ setAlertMessage, setAlertType }) => {
  const [userRole, setUserRole] = useState("client");
  const [wantsLocal, setWantsLocal] = useState(false);
  const states = State.getStatesOfCountry("US");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const { user } = useAuth();
  const { signup, isLoading, errorMessage } = useSignup();

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

    if (errorMessage) {
      setAlertMessage(errorMessage);
      setAlertType("danger");
    }
  };

  return (
    <Container className="mt-3 justify-content-center">
      <Row className="bg-light text-dark rounded p-4">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className=" d-grid" controlId="role">
              <Form.Label>Select Role</Form.Label>
              <ButtonGroup className="mb-3">
                {roles.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    size="lg"
                    id={`radio-${idx}`}
                    type="radio"
                    // Selected button should be primary, unselected should be secondary
                    variant={userRole === radio.value ? "primary" : "secondary"}
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
            {/* First Name and Last Name Side by Side */}
            <Row className="mb-3">
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control required id="first_name" type="text" value={formData.first_name} onChange={handleInputChange} />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control required id="last_name" type="text" value={formData.last_name} onChange={handleInputChange} />
              </Col>
            </Row>

            {/* Remaining Fields */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" value={formData.email} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control required type="text" value={formData.username} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" value={formData.password} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <FormCheck
                type="switch"
                id="local-switch"
                label="I am interested in connecting with local coaches"
                checked={wantsLocal}
                onChange={(e) => setWantsLocal(e.target.checked)}
              />
            </Form.Group>

            {wantsLocal && (
              <>
                <Form.Group className="mb-3" controlId="street_address">
                  <Form.Label>Street Address</Form.Label>
                  <Form.Control type="text" value={formData.street_address} onChange={handleInputChange} required={wantsLocal} />
                </Form.Group>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" value={formData.city} onChange={handleInputChange} required={wantsLocal} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Select value={formData.state} onChange={handleInputChange} required={wantsLocal}>
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="zip_code">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.zip_code}
                    onChange={handleInputChange}
                    required={wantsLocal}
                    pattern="^\d{5}(-\d{4})?$"
                    isInvalid={!!formData.zip_code && !/^\d{5}(-\d{4})?$/.test(formData.zip_code)}
                  />
                </Form.Group>
              </>
            )}

            <div className="d-grid">
              <Button size="lg" variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      {user && <Navigate to="/onboard" />}
    </Container>
  );
};

export default RegisterField;
