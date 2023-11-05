import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const url = "http://localhost:3500/";

const CoachOnboarding = () => {
  const [formData, setFormData] = useState({
    experience: "",
    cost_per_session: "",
    availability: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    if (name === 'cost_per_session') {
      parsedValue = value ? parseFloat(value) : ""; // Parse field as a float if it's not empty

    }
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}onboarding/coach/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
            <Form.Group controlId="cost_per_session">
              <Form.Label>Cost per Session</Form.Label>
              <Form.Control type="number" name="cost_per_session" value={formData.cost_per_session} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="availability">
              <Form.Label>Available Hours</Form.Label>
              <Form.Control type="text" name="availability" value={formData.availability} onChange={handleChange} required />
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
