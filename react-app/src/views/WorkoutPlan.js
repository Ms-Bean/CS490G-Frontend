import React, { useEffect, useState, useMemo } from "react";
import WorkoutNavbar from "../components/WorkoutPlan/WorkoutNavbar";
import WorkoutPlanCard from "../components/WorkoutPlan/WorkoutCard";
// import CreateWorkoutPlanForClient from "../components/WorkoutPlan/CreateWorkoutPlanForClient.js";
import { FaRegClipboard } from "react-icons/fa6";
import { FaPlusCircle} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { config } from "./../utils/config";
import { Button, ButtonGroup, Table, Container, Dropdown, Image, DropdownButton, Row, Col, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const WorkoutPlan = () => {
    const navigate = useNavigate();
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [isCoach, setIsCoach] = useState(false);
    const [colCount, setColCount] = useState(4);
    const [rowCount, setRowCount] = useState(0);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [sortDirection, setSortDirection] = useState("ascending");
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useAuth();

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await fetch(`${config.backendUrl}/get_role`, {
                    method: "GET",
                    credentials: "include",
              });
              if (!response.ok) throw new Error("Failed to fetch role");
                const data = await response.json();
                setIsCoach(data.message === "coach");
            }catch (err) {
                console.log(err);
            }
        };

        fetchRole();
    }, []);

    const fetchWorkoutPlans = async () => {
        setIsLoading(true);
        try{
             const response = await fetch(`${config.backendUrl}/workout_plan/author/?author_id=${user.user_id}`, {
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
            const assigned_response = await fetch(`${config.backendUrl}/get_client_dashboard_info`, {
                credentials: "include",
                headers: {
                },
            });
            if (!response.ok) throw new Error("Failed to fetch client dashboard info");
            const assigned_data = await response.json();
    
            let workout_plan_id = assigned_data.workout_plan_id;
            console.log("Assigned workout plan");
            console.log(workout_plan_id);
        }
        catch(err){
            console.log(err);
        }finally {
            setIsLoading(false);
        }
    }

    //re-renders when a workout plan has been created, edited or deleted
    useEffect(() => {
        fetchWorkoutPlans();
        setUploadSuccess(false);
    }, [uploadSuccess]);


    // Filter and sort workout plans
    const filteredAndSortedWorkoutPlans = useMemo(() => {
        let filtered = workoutPlans.filter((workoutPlan) => workoutPlan.name.toLowerCase().includes(searchTerm.toLowerCase()));

        if(sortKey){
            filtered.sort((a, b) => {
                const modifier = sortDirection === 'ascending' ? 1 : -1;
                if (a[sortKey] < b[sortKey]) {
                    return -1 * modifier;
                } else if (a[sortKey] > b[sortKey]) {
                    return 1 * modifier;
                }
                    return 0;
            });
    }

        return filtered;
    }, [searchTerm, sortKey, sortDirection, isLoading]);

    const createGrid = (wps) => {
        const counter = {count : 0};
        return renderRows(wps, counter);
    }

    const renderRows = (wps, counter) => {
        let rows = [];
        for(let row = 0; row < rowCount; row++){
            rows.push(
                <div key={`row-${row}`} className="row my-3">
                    {renderCols(wps, counter)}
                </div>
            )
        }

        return rows;
    }

    const renderCols = (wps, counter) => {
        let cols = [];
        for(let col = 0; col < colCount; col++){
            if(counter.count < wps.length){
                cols.push(
                    <div key={counter.count} className="col-lg-3">
                        {<WorkoutPlanCard workoutPlanName={wps[counter.count].name} workoutPlanId={wps[counter.count].workout_plan_id } handleUploadSuccessChange={handleUploadSuccessChange} />}
                    </div>
                )
                counter.count++;
            }
        }

        return cols;
    }

    const toggleSortDirection = () => {
        setSortDirection((prevDirection) => (prevDirection === "ascending" ? "descending" : "ascending"));
    };

    const handleUploadSuccessChange = () => {
        setUploadSuccess(true);
        fetchWorkoutPlans();
    }
    const handleAssignClick = () =>{
        navigate("../select_workout_plan?user_id=" + user.user_id);
    }
    return (
        <div>
            <WorkoutNavbar 
            handleUploadSuccessChange={handleUploadSuccessChange}
            onSearch={(term) => setSearchTerm(term)}
            onSort={(key) => setSortKey(key)}
            sortKey={sortKey}
            onToggleSortDirection={toggleSortDirection}
            sortDirection={sortDirection}
            user_id ={user.user_id}
            />
            <Button onClick={() => handleAssignClick()}>Choose a workout plan for yourself</Button>
            {workoutPlans.length === 0 ? <div className="container vh-100 d-flex justify-content-center align-items-center">
                <div className="w-50 d-flex flex-column justify-content-center align-items-center border border-black shadow-lg rounded p-2" >
                    <h2><FaRegClipboard className="mb-1" size={30}/> No Workout Plan available</h2>
                    <small>Create a Workout Plan by Clicking the <span><FaPlusCircle/></span> on the Navbar</small>
                </div>
            </div> : 
            <>
                    {!isLoading && filteredAndSortedWorkoutPlans.length === 0 ?
                    <div className="container vh-100 d-flex justify-content-center align-items-center">
                        <div className="w-50 d-flex flex-column justify-content-center align-items-center border border-black shadow-lg rounded p-2" >
                            <h2>No Workout Plan found matching the specified criteria.</h2>
                        </div>
                    </div>
                    :
                    <div className="container mt-3" style={{minHeight: "53em"}}>
                    {createGrid(filteredAndSortedWorkoutPlans)}
                    </div>
                    }
                {isCoach ? 
                <div className="d-flex justify-content-center mt-3">
                    {/* <CreateWorkoutPlanForClient/> */}
                </div>
                :
                <>
                </>}
            </>}
        </div>
    )
}

export default WorkoutPlan;