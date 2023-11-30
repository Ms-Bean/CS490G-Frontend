import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ExerciseAddModal = ({ show, handleClose, setShowAddModal, handleSave }) => 
{

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Exercise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form id="add-exercise-form" onSubmit={handleSave}>
          <Form.Group className="mb-3">
            <Form.Label>Exercise Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter exercise name"
              name="name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter exercise description"
              name="description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Difficulty (0-10)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter difficulty level"
              name="difficulty"
              min={0}
              max={10}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Video Link</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter video link"
              name="video_link"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" form="add-exercise-form">
          Add Exercise
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ExerciseAddModal;