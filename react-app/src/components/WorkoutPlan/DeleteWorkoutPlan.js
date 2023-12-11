import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { config } from "./../../utils/config";

function DeleteWorkoutPlan({ workoutPlanName, workoutPlanId, handleUploadSuccessChange }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteDB = async () =>{
        try{
            const response = await fetch (`${config.backendUrl}/workout_plan/${workoutPlanId}`,{
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
        handleUploadSuccessChange(true);
    }

    return (
        <>
            <button onClick={handleShow} className="btn btn-danger w-50 rounded-top-0">
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
                <center>Are you sure you want to delete workout plan "{workoutPlanName}"? <p/><b>This action cannot be undone.</b></center>
            </Modal.Body>
            <Modal.Footer>
                <Button className='w-100' onClick={handleDelete} variant="danger">Delete</Button>
            </Modal.Footer>
            </Modal>
        </>
      );
}

export default DeleteWorkoutPlan;