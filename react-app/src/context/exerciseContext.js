import React, { createContext, useState, useEffect } from "react";

export const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState("");
  const [selectedExercise, setSelectedExercise] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const clearError = () => setError("");

  // Function to fetch exercises - can be called to refresh data
  const fetchExercises = async () => {
    try {
      const response = await fetch("http://localhost:3500/exercises", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch exercises");
      const data = await response.json();
      setExercises(data);
      clearError();
    } catch (err) {
      setError(err.message || "An error occurred while fetching exercises."); // Set error message
    }
  };

  const fetchExerciseDetails = async (exercise) => {
    try {
      const response = await fetch(`http://localhost:3500/exercise/${exercise.exercise_id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch exercise details");
      const data = await response.json();
  
      // Parse and transform muscle_groups and equipment_items
      if (data.muscle_groups) {
        data.muscle_groups = JSON.parse(data.muscle_groups).map(group => ({
          value: Object.keys(group)[0], // assuming first key is the identifier
          label: Object.values(group)[0] // assuming first value is the label
        }));
      }
  
      if (data.equipment_items) {
        data.equipment_items = JSON.parse(data.equipment_items).map(item => ({
          value: Object.keys(item)[0], // assuming first key is the identifier
          label: Object.values(item)[0] // assuming first value is the label
        }));
      }
  
      setSelectedExercise(data);
      clearError();
    } catch (err) {
      setError(err.message || "An error occurred while fetching exercise details.");
    }
  };
  
  const handleInfoOrEdit = (exerciseId, mode) => {
    fetchExerciseDetails(exerciseId);
    setModalMode(mode);
    setShowModal(true);
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        setExercises,
        selectedExercise,
        setSelectedExercise,
        showModal,
        setShowModal,
        modalMode,
        setModalMode,
        handleInfoOrEdit,
        fetchExercises,
        fetchExerciseDetails,
        error,
        clearError,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};
