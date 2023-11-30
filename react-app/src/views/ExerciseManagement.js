import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Row, Modal } from "react-bootstrap";
import ExerciseCard from "../components/ExerciseCard";
import ExerciseNavbar from "../components/Exercises/ExerciseNavbar";
import ExerciseModal from "../components/Exercises/ExerciseModal";

const ExerciseManagement = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCardId, setSelectedCardId] = useState(null);

  const handleCardSelect = (exerciseId) => {
    setSelectedCardId(exerciseId);
  };

  const [modalMode, setModalMode] = useState("view"); // 'view' or 'edit'
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);

  const handleInfo = (exercise) => {
    setSelectedExercise(exercise);
    setModalMode("view");
    setShowModal(true);
  };

  const handleEdit = (exercise) => {
    setSelectedExercise(exercise);
    setModalMode("edit");
    setShowModal(true);
  };

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
              <ExerciseCard
                key={exercise.exercise_id}
                exercise={exercise}
                onEdit={handleEdit}
                onInfo={handleInfo}
                onSelect={() => handleCardSelect(exercise.exercise_id)}
                isSelected={selectedCardId === exercise.exercise_id}
              />
            ))}
          </Row>
        )}

        <ExerciseModal
          showModal={showModal}
          handleClose={handleModalClose}
          selectedExercise={selectedExercise}
          modalMode={modalMode}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setModalMode={setModalMode}
        />
      </Container>
    </div>
  );
};

export default ExerciseManagement;
