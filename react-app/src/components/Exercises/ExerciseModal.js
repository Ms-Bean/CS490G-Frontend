import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { ExerciseContext } from "../../context/exerciseContext";
import ViewExerciseModal from "./ExerciseViewModal";
import EditExerciseModal from "./ExerciseEditModal";

const ExerciseModal = ({ isAdmin }) => {
  const { exercises, setExercises, fetchExercises } = useContext(ExerciseContext);
  const [goals, setGoals] = useState([]);
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [error, setError] = useState("");
  const { selectedExercise, setSelectedExercise, showModal, setShowModal, modalMode, setModalMode, fetchExerciseDetails } =
    useContext(ExerciseContext);

  const fetchGoals = async () => {
    try {
      const response = await fetch("http://localhost:3500/goals");
      const data = await response.json();
      setGoals(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchMuscleGroups = async () => {
    try {
      const response = await fetch("http://localhost:3500/muscle-groups");
      const data = await response.json();
      setMuscleGroups(data);
    } catch (err) {
      setError(err.message);
    }
  };
  const fetchEquipmentItems = async () => {
    try {
      const response = await fetch("http://localhost:3500/equipment");
      const data = await response.json();
      setEquipmentItems(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (event) => { 
    const { name, value } = event.target;
    setSelectedExercise((prev) => ({ ...prev, [name]: value }));
  };

  const updateExercise = async () => {
    const response = await fetch(`http://localhost:3500/update_exercise/${selectedExercise.exercise_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedExercise),
      credentials: "include",
    });
    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExercise.exercise_id) {
      setError("No exercise selected.");
      return;
    }

    try {
      const response = await updateExercise();
      if (!response.ok) throw new Error("Failed to update exercise");
      if (response.status === 403) {
        setError("You do not have permission to update this exercise");
        return;
      }

      setExercises(exercises.map((ex) => (ex.exercise_id === selectedExercise.exercise_id ? selectedExercise : ex)));
      fetchExerciseDetails(selectedExercise);
      setModalMode("view");
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteExercise = async (exerciseId) => {
    const response = await fetch(`http://localhost:3500/delete_exercise/${exerciseId}`, {
      method: "DELETE",
      credentials: "include",
    });
    return response;
  };

  const handleDelete = async () => {
    try {
      const response = await deleteExercise(selectedExercise.exercise_id);
      if (!response.ok) throw new Error("Unable to delete exercise");
      setExercises(exercises.filter((ex) => ex.exercise_id !== selectedExercise.exercise_id));
      fetchExercises();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (modalMode === "edit") {
      fetchGoals();
      fetchMuscleGroups();
      fetchEquipmentItems();
    }
  }, [modalMode]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{modalMode === "edit" ? "Edit Exercise" : "Exercise Information"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {modalMode === "edit" ? (
          <EditExerciseModal
            selectedExercise={selectedExercise}
            setSelectedExercise={setSelectedExercise}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            goals={goals}
            muscleGroups={muscleGroups}
            equipmentItems={equipmentItems}
          />
        ) : (
          <ViewExerciseModal selectedExercise={selectedExercise} handleClose={() => setShowModal(false)} />
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
