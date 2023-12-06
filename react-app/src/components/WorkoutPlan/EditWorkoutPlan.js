import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TableData from './EditWorkoutForm';

function EditWorkoutPlan({workoutPlanName, workoutPlanId}) {
  const [show, setShow] = useState(false);

  var addExArr = [];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addToDB = async (exer) => {
    try{
        console.log(exer.name);
        console.log("in2")
        const data = {
            workout_plan_id : Number(workoutPlanId),
            exercise_id : Number(exer.exercise_id),
            weekday : exer.weekday.toLowerCase(),
            time : exer.time+':00',
            reps_per_set : Number(exer.reps_per_set),
            num_sets : Number(exer.num_sets),
            weight : ((exer.weight) ? Number(exer.weight) : null)
        }
        console.log("in transit", data);
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
            throw new Error(`Failed to update workout plan. Status: ${response.status}`);
        }

    } catch(err){
        console.log(err);
    }
}
  
const handleSave = () =>{
    console.log("in")
    const dataIds = JSON.parse(window.sessionStorage.getItem("add_exercise_array"));
    console.log(dataIds)
    dataIds.forEach((element)=> addToDB(JSON.parse(window.sessionStorage.getItem(element))))
}

  return (
    <>
        <button onClick={handleShow} className="w-50 btn btn-primary rounded-0">
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