import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { ExerciseContext } from "../../context/exerciseContext";

const ViewExerciseModal = ({ selectedExercise, handleClose }) => (
  <div>
    <p><strong>Name:</strong> {selectedExercise.name}</p>
    <p><strong>Description:</strong> {selectedExercise.description}</p>
    <p><strong>Difficulty:</strong> {selectedExercise.difficulty}</p>
    <p><strong>Goals:</strong> {selectedExercise.goal_name}</p>
    <p><strong>Video Link:</strong>{" "}
      <a href={selectedExercise.video_link} target="_blank" rel="noopener noreferrer">
        View Video
      </a>
    </p>
  </div>
);

const EditExerciseModal = ({ selectedExercise, handleChange, handleSubmit, goals }) => (
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
      <Form.Label>Goal</Form.Label>
      <Form.Select name="goal_id" value={selectedExercise.goal_id || ""} onChange={handleChange}>
        <option value="">Select a goal</option>
        {goals.map((goal) => (
          <option key={goal.goal_id} value={goal.goal_id}>
            {goal.name}
          </option>
        ))}
      </Form.Select>
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
);

const ExerciseModal = ({ isAdmin }) => {
  const { exercises, setExercises, fetchExercises } = useContext(ExerciseContext);
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState("");
  const { selectedExercise, setSelectedExercise, showModal, setShowModal, modalMode, setModalMode } = useContext(ExerciseContext);

  const handleChange = (e) => {
    setSelectedExercise({ ...selectedExercise, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setShowModal(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExercise.exercise_id) {
      setError("No exercise selected."); // Set an error if no exercise is selected
      return;
    }

    try {
      const response = await fetch(`http://localhost:3500/update_exercise/${selectedExercise.exercise_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedExercise),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update exercise");

      // backend returns 403 when permission denied due to user role
      if (response.status === 403) {
        setError("You do not have permission to update this exercise");
        return;
      }

      setExercises(
        exercises.map((ex) => {
          return ex.exercise_id === selectedExercise.exercise_id ? selectedExercise : ex;
        })
      );

      if (response.ok) {
        fetchExercises(); // Re-fetch exercises to update the list
        setModalMode("view"); // Switch back to view mode
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (exerciseId) => {
    try {
      const response = await fetch(`http://localhost:3500/delete_exercise/${exerciseId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Unable to delete exercise");
      setExercises(exercises.filter((ex) => ex.exercise_id !== exerciseId));
      if (response.ok) {
        fetchExercises(); // Re-fetch exercises to update the list
        setShowModal(false); // Close the modal
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("http://localhost:3500/goals");
        if (!response.ok) throw new Error("Failed to fetch goals");
        const data = await response.json();
        setGoals(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (showModal) {
      // Only fetch goals if modal is open
      fetchGoals();
    }
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalMode === "edit" ? "Edit Exercise" : "Exercise Information"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
        {modalMode === "edit" ? (
          <EditExerciseModal 
            selectedExercise={selectedExercise} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            goals={goals} 
          />
        ) : (
          <ViewExerciseModal selectedExercise={selectedExercise} handleClose={handleClose} />
        )}
      </Modal.Body>

      {isAdmin && (
        <Modal.Footer>
          {modalMode === "view" && (
            <Button variant="primary" onClick={() => setModalMode("edit")} className="btn-dark me-2 w-100">
              Edit
            </Button>
          )}{" "}
          {modalMode === "edit" && (
            <>
              <Button variant="primary" type="submit" onClick={handleSubmit} className="btn-dark me-2 w-100">
                Save Changes
              </Button>
              <Button variant="danger" onClick={() => handleDelete(selectedExercise.exercise_id)} className="me-2 w-100">
                Delete
              </Button>
            </>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ExerciseModal;
