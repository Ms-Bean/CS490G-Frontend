import React, { useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import EditWorkoutPlan from "./EditWorkoutPlan";
import WorkoutPlanInfo from "./WorkoutPlanInfo";
import DeleteWorkoutPlan from "./DeleteWorkoutPlan";

const WorkoutPlanCard = ({ workoutPlanName, workoutPlanId, handleUploadSuccessChange }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="card bg-light" 
      style={{ height: "15em" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-body">
        <h5 className="card-title">{workoutPlanName}</h5>
      </div>
      {isHovered && (
        <>
          <ButtonGroup className="w-100 p-2">
            <WorkoutPlanInfo workoutPlanName={workoutPlanName} workoutPlanId={workoutPlanId} />
            <EditWorkoutPlan workoutPlanName={workoutPlanName} workoutPlanId={workoutPlanId} handleUploadSuccessChange={handleUploadSuccessChange} />
          </ButtonGroup>
          <ButtonGroup className="w-100 p-2" >
            <DeleteWorkoutPlan workoutPlanName={workoutPlanName} workoutPlanId={workoutPlanId} handleUploadSuccessChange={handleUploadSuccessChange}/>
          </ButtonGroup>
        </>
      )}
    </div>
  );
};

export default WorkoutPlanCard;
