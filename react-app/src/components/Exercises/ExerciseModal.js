import React, { useContext, useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { ExerciseContext } from "../../context/exerciseContext";
import ViewExerciseModal from "./ExerciseViewModal";
import EditExerciseModal from "./ExerciseEditModal";
import ConfirmDialog from "./ConfirmDialog.js";

const ExerciseModal = ({ isAdmin }) => {
  const {
    exercises,
    setExercises,
    selectedExercise,
    setSelectedExercise,
    showModal,
    setShowModal,
    modalMode,
    setModalMode,
    fetchExercises,
    fetchExerciseDetails,
    error,
    setError,
    goals,
    muscleGroups,
    equipmentItems,
  } = useContext(ExerciseContext);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmDialogMessage, setConfirmDialogMessage] = useState("");

  const updateExercise = async () => {
    console.log("Updating exercise:", selectedExercise);
    const response = await fetch(`http://localhost:3500/update_exercise/${selectedExercise.exercise_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedExercise),
      credentials: "include",
    });
    return response;
  };

  const handleSubmit = async (e) => {
    setError("");
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
    setError("");
    try {
      const references = await checkExerciseReferences(selectedExercise.exercise_id);
      if (references && references.length > 0) {
        setConfirmDialogMessage(`This exercise is referenced in other tables:\n\n${references.join("\n")}`);
        setShowConfirmDialog(true);
      } else {
        proceedWithDelete();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const checkExerciseReferences = async (exerciseId) => {
    try {
      const response = await fetch(`http://localhost:3500/exercise/${exerciseId}/references`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to check exercise references");
      const data = await response.json();
      return data; // This should be an array of messages or an empty array
    } catch (err) {
      setError(err.message);
    }
  };

  const proceedWithDelete = async () => {
    const response = await deleteExercise(selectedExercise.exercise_id);
    if (!response.ok) throw new Error("Unable to delete exercise");
    setExercises(exercises.filter((ex) => ex.exercise_id !== selectedExercise.exercise_id));
    fetchExercises();
    setShowModal(false);
    setShowConfirmDialog(false);
  };

  return (
    <>
      <ConfirmDialog
        show={showConfirmDialog}
        handleClose={() => setShowConfirmDialog(false)}
        handleConfirm={() => {
          proceedWithDelete(selectedExercise.exercise_id);
          setShowConfirmDialog(false);
        }}
        title="Confirm Delete"
      >
        {confirmDialogMessage}
      </ConfirmDialog>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setError("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === "edit" ? "Edit Exercise" : selectedExercise.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {modalMode === "edit" ? (
            <EditExerciseModal
              selectedExercise={selectedExercise}
              setSelectedExercise={setSelectedExercise}
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
                <Button variant="danger" onClick={handleDelete} className="me-2 w-100">
                  Delete
                </Button>
              </>
            )}
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default ExerciseModal;
