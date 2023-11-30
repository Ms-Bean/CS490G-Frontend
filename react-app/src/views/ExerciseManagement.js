import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Row, Modal } from "react-bootstrap";
import ExerciseCard from "../components/ExerciseCard";
import ExerciseNavbar from "../components/Exercises/ExerciseNavbar";
import ExerciseModal from "../components/Exercises/ExerciseModal";
import ExerciseAddModal from "../components/Exercises/ExerciseAddModal";
import { useAuth } from "../hooks/useAuth";

const ExerciseManagement = () => {
  const { user } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const handleShowAddModal = () => setShowAddModal(true);

  const handleCardSelect = (exerciseId) => {
    // Toggle selection: If the clicked card is already selected, unselect it. Otherwise, select it.
    if (selectedCardId === exerciseId) {
      setSelectedCardId(null);
    } else {
      setSelectedCardId(exerciseId);
    }
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

  const handleDelete = async (exerciseId) => {
    console.log("Deleting exercise with ID:", exerciseId);
    try {
      const response = await fetch(`http://localhost:3500/delete_exercise/${exerciseId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to delete exercise");
      alert("Exercise deleted successfully!");
      // Update the state to reflect the deletion
      setExercises(exercises.filter((ex) => ex.exercise_id !== exerciseId));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChange = (e) => {
    setSelectedExercise({ ...selectedExercise, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newExerciseData = Object.fromEntries(formData.entries());
    // Add the user_who_created_it field to the new exercise data
    newExerciseData.user_who_created_it = user.user_id;
    try {
      const response = await fetch("http://localhost:3500/add_exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExerciseData),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to add new exercise");
  
      const addedExercise = await response.json(); // Assuming the server responds with the added exercise data
      setExercises([...exercises, addedExercise]);
  
      setShowAddModal(false);
      alert("New exercise added successfully!");
    } catch (err) {
      alert(err.message);
    }
  };
  
  return (
    <div>
      <ExerciseNavbar onAddExercise={handleShowAddModal} />
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
                onDelete={handleDelete}
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

        <ExerciseAddModal show={showAddModal} handleClose={() => setShowAddModal(false)} handleSave={handleSave} />
      </Container>
    </div>
  );
};

export default ExerciseManagement;
