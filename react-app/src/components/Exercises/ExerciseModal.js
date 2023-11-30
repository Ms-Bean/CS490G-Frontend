import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ExerciseModal = ({ showModal, handleClose, selectedExercise, modalMode, handleChange, handleSubmit, setModalMode }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalMode === "edit" ? "Edit Exercise" : "Exercise Information"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalMode === "edit" ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Exercise Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter exercise name"
                name="name"
                value={selectedExercise.name || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter exercise description"
                name="description"
                value={selectedExercise.description || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Difficulty (0-10)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter difficulty level"
                name="difficulty"
                value={selectedExercise.difficulty || 0}
                onChange={handleChange}
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
                value={selectedExercise.video_link || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        ) : (
          <div>
            <p>
              <strong>Name:</strong> {selectedExercise.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedExercise.description}
            </p>
            <p>
              <strong>Difficulty:</strong> {selectedExercise.difficulty}
            </p>
            <p>
              <strong>Video Link:</strong>{" "}
              <a href={selectedExercise.video_link} target="_blank" rel="noopener noreferrer">
                View Video
              </a>
            </p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {modalMode === "view" && (
          <Button variant="primary" onClick={() => setModalMode("edit")} className="btn-dark me-2 w-100">
            Edit
          </Button>
        )}{" "}
        {modalMode === "edit" && (
          <Button variant="primary" type="submit" onClick={handleSubmit} className="btn-dark me-2 w-100">
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ExerciseModal;
