import React, { useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import EditWorkoutPlan from "./EditWorkoutPlan";
import WorkoutPlanInfo from "./WorkoutPlanInfo";
import DeleteWorkoutPlan from "./DeleteWorkoutPlan";

const WorkoutPlanCard = ({ workoutPlanName, workoutPlanId, handleUploadSuccessChange }) => {
  return (
    <div className="card bg-light" style={{ height: "15em" }}>
      <div className="card-body">
        <h5 className="card-title">{workoutPlanName}</h5>
      </div>
      <ButtonGroup className="w-100 px-2">
        <WorkoutPlanInfo workoutPlanName={workoutPlanName} workoutPlanId={workoutPlanId} />
      </ButtonGroup>
      <ButtonGroup className="w-100 px-2 pb-2">
        <EditWorkoutPlan
          workoutPlanName={workoutPlanName}
          workoutPlanId={workoutPlanId}
          handleUploadSuccessChange={handleUploadSuccessChange}
        />
        <DeleteWorkoutPlan
          workoutPlanName={workoutPlanName}
          workoutPlanId={workoutPlanId}
          handleUploadSuccessChange={handleUploadSuccessChange}
        />
      </ButtonGroup>
    </div>
  );
};

export default WorkoutPlanCard;
