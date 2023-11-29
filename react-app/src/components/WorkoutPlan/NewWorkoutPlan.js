import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlusCircle} from "react-icons/fa";

function NewWorkoutPlan() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <div onClick={handleShow} className="d-inline ms-3" data-bs-toggle="modal" style={{cursor : "pointer"}}>
            <FaPlusCircle size={22} style={{color : "#6CB4EE"}}/>
        </div>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title>New Workout Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            New Workout Plan form goes here
        </Modal.Body>
        <Modal.Footer>
            <Button className='w-100' variant="dark">Save</Button>
        </Modal.Footer>
        </Modal>
    </>
  );
}

export default NewWorkoutPlan;