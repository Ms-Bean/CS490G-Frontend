import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Row, Modal } from "react-bootstrap";
import ExerciseCard from "../components/ExerciseCard";
import ExerciseNavbar from "../components/Exercises/ExerciseNavbar";

const ExerciseManagement = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3500/exercises");
        if (!response.ok) throw new Error("Failed to fetch exercises");
        const data = await response.json();
        setExercises(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExercise.exercise_id) {
      alert("Please select an exercise to update");
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
      alert("Exercise updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChange = (e) => {
    setSelectedExercise({ ...selectedExercise, [e.target.name]: e.target.value });
  };

  const handleEdit = (exercise) => {
    setSelectedExercise(exercise);
    handleShow();
  };

  return (
    <div>
      <ExerciseNavbar />
      <Container className="mt-4">
        {isLoading ? (
          <p>Loading exercises...</p>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Row>
            {exercises.map((exercise) => (
              <ExerciseCard key={exercise.exercise_id} exercise={exercise} onEdit={handleEdit} />
            ))}
          </Row>
        )}

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Exercise</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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

              <Button variant="primary" type="submit">
                Update Exercise
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ExerciseManagement;
