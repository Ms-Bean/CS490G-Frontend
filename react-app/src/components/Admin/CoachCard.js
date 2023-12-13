import React from "react";
import { ButtonGroup } from "react-bootstrap";
import CoachInfo from "./CoachInfo";
import AcceptCoach from "./AcceptCoach";
import RejectCoach from "./RejectCoach";

const CoachCard = ({ coach, handleUploadSuccessChange}) => {
  return (
    <div className="card bg-light" style={{ height: "20em" }}>
      <div className="card-body">
        <h5 className="card-title">{coach.firstName} {coach.lastName}</h5>
      </div>
      {/* <ButtonGroup className="w-100 p-2">
        <WorkoutPlanInfo workoutPlanName={workoutPlanName} workoutPlanId={workoutPlanId} />
        <EditWorkoutPlan workoutPlanName={workoutPlanName} workoutPlanId={workoutPlanId} handleUploadSuccessChange={handleUploadSuccessChange} />
      </ButtonGroup> */}
      {/* <ButtonGroup className="w-100 p-2" ><DeleteWorkoutPlan workoutPlanName={workoutPlanName} workoutPlanId={workoutPlanId} handleUploadSuccessChange={handleUploadSuccessChange}/></ButtonGroup> */}
      <CoachInfo coach={coach} />
      <ButtonGroup className="w-100">
        <AcceptCoach user_id={coach.userId} handleUploadSuccessChange={handleUploadSuccessChange}/>
        <RejectCoach user_id={coach.userId} handleUploadSuccessChange={handleUploadSuccessChange}/>
      </ButtonGroup>
    </div>
  );
};

export default CoachCard;