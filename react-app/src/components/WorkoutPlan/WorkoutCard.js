import React from "react";
import EditWorkoutPlan from "./EditWorkoutPlan";
import WorkoutPlanInfo from "./WorkoutPlanInfo";

const WorkoutPlanCard = ({workoutPlanName}) => {
    return(
        <div class="card bg-light">
            <div class="card-body">
                <h5 class="card-title">{workoutPlanName}</h5>
                <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                <div className="d-flex justify-content-center">
                    <WorkoutPlanInfo workoutPlanName={workoutPlanName}/>
                    <EditWorkoutPlan/>
                </div>
            </div>
        </div>
    )
}

export default WorkoutPlanCard;