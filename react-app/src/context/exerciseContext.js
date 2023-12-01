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

  const handleInfoOrEdit = (exercise, mode) => {
    setSelectedExercise(exercise);
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
        error,
        clearError,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};
