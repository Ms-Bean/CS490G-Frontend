import React, { useEffect, useState } from "react";
import WorkoutNavbar from "../components/WorkoutPlan/WorkoutNavbar";
import WorkoutPlanCard from "../components/WorkoutPlan/WorkoutCard";
import ScheduleWorkout from "../components/WorkoutPlan/ScheduleWorkout";
import { FaRegClipboard } from "react-icons/fa6";
import { FaPlusCircle} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

const WorkoutPlan = () => {

    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [colCount, setColCount] = useState(4);
    const [rowCount, setRowCount] = useState(0);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [sortByOption, setSortByOption] = useState(null);
    const {user} = useAuth();
    let index = 0;

    useEffect(() => {
        const fetchWorkoutPlans = async () => {
        try{
             const response = await fetch(`http://localhost:3500/workout_plan/author/?author_id=${user.user_id}`, {
                credentials: "include",
              });
            
             if (!response.ok) {
                 throw new Error('Network response was not ok');
             }
 
             const data = await response.json();
             if(data.workout_plans.length > 0){
                setRowCount(Math.floor(data.workout_plans.length / colCount) + 1);
             }
             setWorkoutPlans(data.workout_plans);
        }
        catch(err){
            console.log(err);
        }
        }

        fetchWorkoutPlans();
    }, [uploadSuccess]);

    const createGrid = () => {
        if(workoutPlans.length > 0){
            return renderRows();
        }
        return [];
    }

    const renderRows = () => {
        let rows = [];
        for(let row = 0; row < rowCount; row++){
            rows.push(
                <div key={`row-${row}`} className="row my-3">
                    {renderCols()}
                </div>
            )
        }

        return rows;
    }

    const renderCols = () => {
        let cols = [];
        for(let col = 0; col < colCount; col++){
            if(index < workoutPlans.length){
                cols.push(
                    <div key={index} className="col-lg-3">
                        {<WorkoutPlanCard workoutPlanName={workoutPlans[index].name} workoutPlanId={workoutPlans[index].workout_plan_id} />}
                    </div>
                )
                index++;
            }
        }

        return cols;
    }

    const handleUploadSuccessChange = () => {
        setUploadSuccess(true);
    }

    return (
        <div>
            <WorkoutNavbar handleUploadSuccessChange={handleUploadSuccessChange}/>
            {workoutPlans.length === 0 ? <div className="container vh-100 d-flex justify-content-center align-items-center">
                <div className="w-50 d-flex flex-column justify-content-center align-items-center border border-black shadow-lg rounded p-2" >
                    <h2><FaRegClipboard className="mb-1" size={30}/> No Workout Plan available</h2>
                    <small>Create a Workout Plan by Clicking the <span><FaPlusCircle style={{color : "#6CB4EE"}}/></span> on the Navbar</small>
                </div>
            </div> : 
            <>
                <div className="container mt-3">
                    {createGrid()}
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <ScheduleWorkout/>
                </div>
            </>}
        </div>
    )
}

export default WorkoutPlan;