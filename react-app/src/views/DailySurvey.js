import React, { useState } from "react";
import { Container, Form, Button, Row, Col, InputGroup, Navbar, Alert } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { FaAppleAlt, FaRunning, FaWeight, FaTint, FaRegSmileBeam } from "react-icons/fa";
import { config } from "./../utils/config";

const DailySurveyForm = () => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  const initialFormData = {
    calories_consumed: "",
    weight: "",
    calories_burned: "",
    water_intake: "",
    mood: "",
    survey_date: getCurrentDate(),
  };
  const [formData, setFormData] = useState(initialFormData);
  const resetForm = () => {
    setFormData({ ...initialFormData, survey_date: formData.survey_date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    // Reset the confirmation/error message when the user attempts to submit form
    if (confirmationMessage) {
      setConfirmationMessage("");
    }
    if (error) {
      setError("");
    }

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true); // Enable validation feedback on the form
    } else {
      setValidated(false); // Reset validation state for a new submission

      const currentDateTime = new Date().toISOString();

      if (!user || !user.user_id) {
        console.error("User ID is not available. User might not be logged in.");
        return;
      }

      const extendedFormData = {
        ...formData,
        created: currentDateTime,
        modified: currentDateTime,
        date: formData.survey_date,
        user_id: user.user_id,
      };

      try {
        const response = await fetch(`${config.backendUrl}/daily_survey`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(extendedFormData),
        });
        if (response.ok) {
          setConfirmationMessage(`Your daily survey for ${formData.survey_date} has been recorded.`);
          setError("");
          resetForm();
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      {/* <Navbar variant="dark" bg="dark" expand="lg" className="secondary-navbar">
        <Container className="justify-content-center">
          <Navbar.Brand>Daily Survey</Navbar.Brand>
        </Container>
      </Navbar> */}
      <Container className="mt-2">
        <h1 className="d-flex m-2 justify-content-center">Daily Survey</h1>
        <Row className="mt-3 justify-content-md-center">
          <Col md={6}>
            {error || confirmationMessage ? (
              <Alert variant={error ? "danger" : "success"} className="mt-3">
                {error || confirmationMessage}
              </Alert>
            ) : null}

            <Form.Group className="mb-3" controlId="formSurveyDate">
              <Form.Label>Survey Date</Form.Label>
              <Form.Control required type="date" name="survey_date" onChange={handleInputChange} value={formData.survey_date} />
              <Form.Control.Feedback type="invalid">Please choose a date for the survey.</Form.Control.Feedback>
            </Form.Group>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="formCaloriesConsumed">
                  <Form.Label>Calories Consumed</Form.Label>

                  <InputGroup>
                    <InputGroup.Text>
                      <FaAppleAlt />
                    </InputGroup.Text>
                    <Form.Control
                      required
                      type="number"
                      name="calories_consumed"
                      onChange={handleInputChange}
                      value={formData.calories_consumed}
                    />{" "}
                    <Form.Control.Feedback type="invalid">Please enter calories consumed.</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="formCaloriesBurned">
                  <Form.Label>Calories Burned</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaRunning />
                    </InputGroup.Text>
                    <Form.Control
                      required
                      type="number"
                      name="calories_burned"
                      onChange={handleInputChange}
                      value={formData.calories_burned}
                    />{" "}
                    <Form.Control.Feedback type="invalid">Please enter calories burned.</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formWeight">
                <Form.Label>Weight</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaWeight />
                  </InputGroup.Text>
                  <Form.Control required type="number" name="weight" onChange={handleInputChange} value={formData.weight} />
                  <Form.Control.Feedback type="invalid">Please enter your weight.</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formWaterIntake">
                <Form.Label>Water Intake</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaTint />
                  </InputGroup.Text>
                  <Form.Control required type="number" name="water_intake" onChange={handleInputChange} value={formData.water_intake} />
                  <Form.Control.Feedback type="invalid">Please enter your water intake.</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMood">
                <Form.Label>Mood</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaRegSmileBeam />
                  </InputGroup.Text>

                  <Form.Select required name="mood" onChange={handleInputChange} value={formData.mood}>
                    <option value="">Select Mood</option>
                    <option value="happy">Happy</option>
                    <option value="sad">Sad</option>
                    <option value="energetic">Energetic</option>
                    <option value="tired">Tired</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">Please select your mood.</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Button variant="dark" type="submit" className="btn btn-dark my-2 w-100">
                Submit Survey
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DailySurveyForm;
