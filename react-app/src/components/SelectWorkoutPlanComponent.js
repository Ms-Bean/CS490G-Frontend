import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { config } from "./../utils/config";
import { Button, ButtonGroup, Table, Container, Dropdown, Image, DropdownButton, Row, Col, Modal } from "react-bootstrap";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


let client_id = urlParams.get("user_id");
const handleAssignClick = (workout_plan_id) => {
  try {
    let client_id = urlParams.get("user_id");
    fetch(`${config.backendUrl}/assign_workout_plan`, {
      method: "POST",
      credentials: "include",
      headers: {
        "client_id": client_id,
        "workout_plan_id": workout_plan_id
      }
    }).then((response) =>{
      if (!response.ok) throw new Error("Failed to assign workout plan");
    }).catch( (err) =>{
      console.log("Err");
    });
  } catch (err) {
    console.log(err);
  }
}

const SelectWorkoutPlanComponent = () => {

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

    return (
      <div id="wrapper">
        <h1>Assign a workout plan to your client</h1>
        <table className="table responsive">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Assign</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="2">
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : workout_plans.length > 0 ? (
              workout_plans.map((workout_plan, index) => (
                <tr key={index}>
                  <td>
                    {workout_plan.name}
                  </td>
                  <td>
                  <Button onClick={() => handleAssignClick(workout_plan.workout_plan_id)}>Assign Workout Plan</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No workout plans to display</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
};

export default SelectWorkoutPlanComponent;