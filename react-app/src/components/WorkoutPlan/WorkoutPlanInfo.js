import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WorkoutPlanInfo({workoutPlanName}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <button onClick={handleShow} className="w-50 btn btn-secondary rounded-0">
            Info
        </button>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title>{workoutPlanName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Workout Plan Info goes here
        </Modal.Body>
        <Modal.Footer>
            <Button className='w-100' variant="dark">Edit</Button>
        </Modal.Footer>
        </Modal>
    </>
  );
}

export default WorkoutPlanInfo;