import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TableData from './EditWorkoutForm';
import { useAuth } from '../../hooks/useAuth';

function EditWorkoutPlan({workoutPlanName, workoutPlanId}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {user} = useAuth();

  const addToDB = async (exer) => {
    try{
        const data = {
            workout_plan_id : Number(workoutPlanId),
            exercise_id : ((Number.isInteger(exer.exercise_id)) ? Number(exer.exercise_id) : 1),
            weekday : exer.weekday.toLowerCase(),
            time : exer.time+':00',
            reps_per_set : ((exer.reps_per_set) ? Number(exer.reps_per_set) : null),
            num_sets : ((exer.num_sets) ? Number(exer.num_sets) : null),
            weight : ((exer.weight) ? Number(exer.weight) : null)
        }
        console.log("in transit (add)", data);
        const response = await fetch(`http://localhost:3500/workout_plan/${workoutPlanId}/exercise/new`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include", 
        });
        console.log(response);

        if (!response.ok) {
            throw new Error(`Failed to add to workout plan. Status: ${response.status}`);
        }

    } catch(err){
        console.log(err);
    }
}
  const updateDB = async (exer) =>{
    try{
        const data = {
            workout_plan_exercise_id : Number(exer.workout_plan_exercise_id),
            workout_plan_id : Number(workoutPlanId),
            exercise_id : Number(exer.exercise_id),
            weekday : exer.weekday.toLowerCase(),
            time : exer.time,
            reps_per_set : ((exer.reps_per_set) ? Number(exer.reps_per_set) : null),
            num_sets : ((exer.num_sets) ? Number(exer.num_sets) : null),
            weight : ((exer.weight) ? Number(exer.weight) : null)
        }
        console.log("in transit (update)", data);
        const response = await fetch(`http://localhost:3500/workout_plan/${workoutPlanId}/exercise/${exer.workout_plan_exercise_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include", 
        });
        console.log(response);

        if (!response.ok) {
            throw new Error(`Failed to update workout plan. Status: ${response.status}`);
        }

    } catch(err){
        console.log(err);
    }
  }

  const deleteDB = async (exer) =>{
    try{
        console.log ("del..", exer)
        const response = await fetch (`http://localhost:3500/workout_plan/${workoutPlanId}/exercise/${exer.workout_plan_exercise_id}`,{
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        console.log(response);

        if (!response.ok) {
            throw new Error(`Failed to delete from workout plan. Status: ${response.status}`);
        }
    }   catch(err){
        console.log(err);
    }
  }

  const updaatePlanName = async (name) =>{
    try{
        const data = {
            name : name,
            author_id : user.user_id
        }
        const response = await fetch (`http://localhost:3500/workout_plan/${workoutPlanId}`, {
            method: "PUT", 
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include",   
        });
        console.log(response);

        if (!response.ok) {
            throw new Error(`Failed to update workout plan name Status: ${response.status}`);
        }
    }   catch(err){
        console.log(err);
    }
  }

const handleSave = () =>{
    const dataIdsAdd = JSON.parse(window.sessionStorage.getItem("add_exercise_array"));
    const dataIdsUpdate = JSON.parse(window.sessionStorage.getItem("update_exercise_array"));
    const dataIdsDelete = JSON.parse(window.sessionStorage.getItem("delete_exercise_array"));
    const planName = window.sessionStorage.getItem("WorkoutPlanName")
 
    if (dataIdsAdd.length > 0)
    {
        console.log("add", dataIdsAdd);
        dataIdsAdd.forEach((element)=> addToDB(JSON.parse(window.sessionStorage.getItem(element))));
    }
    if (dataIdsUpdate.length > 0)
    {
        console.log("update", dataIdsUpdate);
        dataIdsUpdate.forEach((element) => updateDB(JSON.parse(window.sessionStorage.getItem(element))));
    }
    if (dataIdsDelete.length > 0)
    {
        console.log("delete", dataIdsDelete);
        dataIdsDelete.forEach((element) => deleteDB(JSON.parse(window.sessionStorage.getItem(element))));
        
    }

    if (planName !== workoutPlanName){
        console.log("PlanName Change:", workoutPlanName, "->", planName)
        updaatePlanName(planName)

    }
    handleClose()
    window.location.reload()

}

  return (
    <>
        <button onClick={handleShow} className="btn btn-primary">
            Edit
        </button>

        <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title>Edit Workout Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <TableData workoutPlanName={workoutPlanName} workoutPlanId={workoutPlanId}/>
        </Modal.Body>
        <Modal.Footer>
            <Button className='w-100' onClick={handleSave} variant="dark">Save Changes</Button>
        </Modal.Footer>
        </Modal>
    </>
  );
}

export default EditWorkoutPlan;