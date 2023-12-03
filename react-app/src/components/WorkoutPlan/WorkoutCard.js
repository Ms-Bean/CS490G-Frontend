import React from "react";
import EditWorkoutPlan from "./EditWorkoutPlan";
import WorkoutPlanInfo from "./WorkoutPlanInfo";

const WorkoutPlanCard = ({workoutPlanName, workoutPlanId}) => {
    return(
        <div className="card bg-light" style={{height : "20em"}}>
            <div className="card-body">
                <h5 className="card-title">{workoutPlanName}</h5>
            </div>
            <div className="card-footer d-flex justify-content-center border border-0 bg-light">
                    <WorkoutPlanInfo workoutPlanName={workoutPlanName} workoutPlanId={workoutPlanId}/>
                    <EditWorkoutPlan workoutPlanName={workoutPlanName} workoutPlanId={workoutPlanId}/>
                </div>
        </div>
    )
}

export default WorkoutPlanCard;