import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import { FaPlusCircle } from "react-icons/fa";

const ExerciseAddModal = () => {
  const { user } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newExerciseData = {
      ...Object.fromEntries(formData.entries()),
      user_who_created_it: user.user_id,
    };

    try {
      const response = await fetch("http://localhost:3500/add_exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExerciseData),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to add new exercise");

      const addedExercise = await response.json();
      setExercises([...exercises, addedExercise]);
      toggleModal();
      // Replace alert with a more integrated notification system if possible
      alert("New exercise added successfully!");
    } catch (err) {
      // Replace alert with a more integrated error display if possible
      alert(err.message);
    }
  };

  return (
    <>
      <div onClick={toggleModal} className="d-inline ms-3" style={{ cursor: "pointer" }}>
        <FaPlusCircle size={22} style={{ color: "#6CB4EE" }} />
      </div>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="add-exercise-form" onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Exercise Name</Form.Label>
              <Form.Control type="text" placeholder="Enter exercise name" name="name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter exercise description" name="description" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Difficulty (0-10)</Form.Label>
              <Form.Control type="number" placeholder="Enter difficulty level" name="difficulty" min={0} max={10} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Video Link</Form.Label>
              <Form.Control type="url" placeholder="Enter video link" name="video_link" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="add-exercise-form">
            Add Exercise
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExerciseAddModal;
