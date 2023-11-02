// CoachOnboarding.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const CoachOnboarding = () => {
  const [formData, setFormData] = useState({
    experience: "",
    costPerSession: "",
    availableHours: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/onboarding/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/dashboard");
      } else {
        console.error("Failed to submit onboarding data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container className="mt-3 form-background justify-content-center">
      <Row className="bg-light text-dark rounded p-4">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="experience">
              <Form.Label>Experience</Form.Label>
              <Form.Control type="text" name="experience" value={formData.experience} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="costPerSession">
              <Form.Label>Cost per Session</Form.Label>
              <Form.Control type="number" name="costPerSession" value={formData.costPerSession} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="availableHours">
              <Form.Label>Available Hours</Form.Label>
              <Form.Control type="text" name="availableHours" value={formData.availableHours} onChange={handleChange} required />
            </Form.Group>
            <Button className="mt-5" type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CoachOnboarding;
