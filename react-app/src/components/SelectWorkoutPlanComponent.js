import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { config } from "./../utils/config";
import { Button, Table, Container, Row, Col, Toast, Card } from "react-bootstrap";


const SelectWorkoutPlanComponent = () => {

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let client_id = urlParams.get("user_id");
  const [workout_plans, setWorkoutPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(client_id);
  const {user} = useAuth();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${config.backendUrl}/workout_plan/author/?author_id=${user.user_id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) =>{
        console.log(data);
        setWorkoutPlans(data.workout_plans);
        for(let i = 0; i < data.workout_plans.length; i++)
        {
          let new_row = document.createElement("tr");
          let new_id = document.createElement("th");
          let new_name = document.createElement("th");

          new_id.setAttribute("scope", "col");
          new_name.setAttribute("scope", "col");

          new_id.innerHTML = data.workout_plans[i].workout_plan_id;
          new_name.innerHTML = data.workout_plans[i].name;
          new_row.appendChild(new_id);
          new_row.appendChild(new_name);
        }
      })
    setIsLoading(false);
  }, []);

  const handleAssignClick = (workout_plan_id, workout_plan_name) => {
    try {
      console.log(workout_plans)
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      let client_id = urlParams.get("user_id");
      console.log("CLIENT ID")
      console.log(client_id);
      fetch(`${config.backendUrl}/assign_workout_plan`, {
        method: "POST",
        credentials: "include",
        headers: {
          "client_id": client_id,
          "workout_plan_id": workout_plan_id
        }
      }).then((response) =>{
        if (!response.ok) throw new Error("Failed to assign workout plan");
        setShowToast(true);
        setToastMessage(workout_plan_name);

        // Clear previous timeout (if any)
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Set a new timeout to hide the toast after a certain duration
        const newTimeoutId = setTimeout(() => {
          setShowToast(false);
        }, 5000);

        setTimeoutId(newTimeoutId);
      }).catch( (err) =>{
        console.log("Err");
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h2 className="text-center">Assign a Workout Plan to User</h2>
            </Card.Header>
            <Card.Body>
              <Table  bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Assign</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="2" className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : workout_plans.length > 0 ? (
                    workout_plans.map((workout_plan, index) => (
                      <tr key={index}>
                        <td style={{ verticalAlign: "middle" }}>{workout_plan.name}</td>
                        <td>
                          <Button className="w-100" onClick={() => handleAssignClick(workout_plan.workout_plan_id, workout_plan.name)}>
                            Assign Workout Plan
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">No workout plans to display</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
        <Col className="text-center m-3">
          <Button href="/workout_plan" variant="secondary">Back</Button>
        </Col>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
      </Row>

      <Toast className="position-absolute top-50 start-50 translate-middle m-3" show={showToast} onClose={() => setShowToast(false)}>
        <Toast.Header>
          <strong >New Workout Plan Assigned</strong>
        </Toast.Header>
        <Toast.Body>Workout Plan {toastMessage} has been successfully assigned.</Toast.Body>
      </Toast>
    </Container>
  );
};

export default SelectWorkoutPlanComponent;
