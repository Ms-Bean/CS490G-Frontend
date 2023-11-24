import React, { useState } from "react";
import WorkoutNavbar from "../components/WorkoutPlan/WorkoutNavbar";
import WorkoutPlanCard from "../components/WorkoutPlan/WorkoutCard";
import ScheduleWorkout from "../components/WorkoutPlan/ScheduleWorkout";

const tempData = [
"Tabata Triumph",
"Strength Circuit",
"Full Body Burn",
"Bootcamp Bonanza",
"Cardio Blast",
"CrossFit Challenge",
"Fat Burn",
"Weight Loss 101",
"Core Mix"
]

const colCount = 4;
const rowCount = Math.floor(tempData.length / colCount) + 1;

const WorkoutPlan = () => {

    let index = 0;

    const renderRows = () => {
        let rows = [];
        for(let row = 0; row < rowCount; row++){
            rows.push(
                <div className="row my-3">
                    {renderCols()}
                </div>
            )
        }

        return rows;
    }

    const renderCols = () => {
        let cols = [];
        for(let col = 0; col < colCount; col++){
            if(index < tempData.length){
                cols.push(
                    <div className="col-lg-3">
                        {<WorkoutPlanCard workoutPlanName={tempData[index]} />}
                    </div>
                )
                index++;
            }
        }

        return cols;
    }

    return (
        <div>
            <WorkoutNavbar/>
            <div className="container mt-3">
                {renderRows()}
            </div>
            <div className="d-flex justify-content-center mt-3">
                <ScheduleWorkout/>
            </div>
        </div>
    )
}

export default WorkoutPlan;