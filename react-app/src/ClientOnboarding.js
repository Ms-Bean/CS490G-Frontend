import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Container } from "react-bootstrap";

const ClientOnboarding = () => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    experience: "",
    budget: "",
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
      const response = await fetch("/onboarding/client", {
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
    <Container>
      <Container className="mt-3 p-4 bg-primary text-white rounded w-50 mx-auto">
        <h1>Client Survey</h1>
        <p>This is the survey delivered to clients</p>
      </Container>
      <Container className="mt-3 form-background d-flex justify-content-center">
        <Row className="w-50 bg-light text-dark rounded p-4">
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="weight">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  placeholder="Enter your weight in kg"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="height">
                <Form.Label>Height</Form.Label>
                <Form.Control
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  placeholder="Enter your height in inches"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="experience">
                <Form.Label>Experience Level</Form.Label>
                <Form.Control as="select" name="experience" value={formData.experience} onChange={handleChange} required>
                  <option value="" disabled>
                    Select your experience level
                  </option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="budget">
                <Form.Label>Budget per Session</Form.Label>
                <Form.Control as="select" name="budget" value={formData.budget} onChange={handleChange} required>
                  <option value="" disabled>
                    Select your budget
                  </option>
                  <option>$</option>
                  <option>$$</option>
                  <option>$$$</option>
                </Form.Control>
              </Form.Group>
              <Button className="mt-2" type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ClientOnboarding;
