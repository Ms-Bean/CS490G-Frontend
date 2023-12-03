import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ScheduleWorkout() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <button onClick={handleShow} className="w-25 mb-3 btn btn-primary">Schedule Workout</button>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title>Schedule Workouts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Schedule Workouts form goes here
        </Modal.Body>
        <Modal.Footer>
            <Button className='w-100' variant="dark">Submit</Button>
        </Modal.Footer>
        </Modal>
    </>
  );
}

export default ScheduleWorkout;