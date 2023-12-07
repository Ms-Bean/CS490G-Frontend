import React from "react";
import { ButtonGroup } from "react-bootstrap";
import EditWorkoutPlan from "./EditWorkoutPlan";
import WorkoutPlanInfo from "./WorkoutPlanInfo";

const WorkoutPlanCard = ({ workoutPlanName, workoutPlanId }) => {
  return (
    <div className="card bg-light" style={{ height: "20em" }}>
      <div className="card-body">
        <h5 className="card-title">{workoutPlanName}</h5>
      </div>
      <ButtonGroup className="w-100 p-2">
        <WorkoutPlanInfo workoutPlanName={workoutPlanName} workoutPlanId={workoutPlanId} />
        <EditWorkoutPlan workoutPlanName={workoutPlanName} workoutPlanId={workoutPlanId} />
      </ButtonGroup>
    </div>
  );
};

export default WorkoutPlanCard;
