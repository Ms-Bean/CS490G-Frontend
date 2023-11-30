import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TableData from './EditWorkoutForm';

function EditWorkoutPlan() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <TableData/>
        </Modal.Body>
        <Modal.Footer>
            <Button className='w-100' variant="dark">Save Changes</Button>
        </Modal.Footer>
        </Modal>
    </>
  );
}

export default EditWorkoutPlan;