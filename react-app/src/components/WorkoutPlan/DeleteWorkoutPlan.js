import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DeleteWorkoutPlan({ workoutPlanName, workoutPlanId }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteDB = async () =>{
        try{
            const response = await fetch (`http://localhost:3500/workout_plan/${workoutPlanId}`,{
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
    const handleDelete =() =>{
        deleteDB();
        handleClose();
        window.location.reload();
    }

    return (
        <>
            <button onClick={handleShow} className="btn btn-danger">
                Delete
            </button>
    
            <Modal
            size="sm"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title>Delete Workout Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete "{workoutPlanName}"? <br/>This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <Button className='w-100' onClick={handleDelete} variant="danger">Delete</Button>
            </Modal.Footer>
            </Modal>
        </>
      );
}

export default DeleteWorkoutPlan;