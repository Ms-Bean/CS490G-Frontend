import React from "react";
import EditWorkoutPlan from "./EditWorkoutPlan";
import WorkoutPlanInfo from "./WorkoutPlanInfo";

const WorkoutPlanCard = ({workoutPlanName}) => {
    return(
        <div class="card bg-light" style={{height : "20em"}}>
            <div class="card-body">
                <h5 class="card-title">{workoutPlanName}</h5>
            </div>
            <div className="card-footer d-flex justify-content-center border border-0 bg-light">
                    <WorkoutPlanInfo workoutPlanName={workoutPlanName}/>
                    <EditWorkoutPlan/>
                </div>
        </div>
    )
}

export default WorkoutPlanCard;