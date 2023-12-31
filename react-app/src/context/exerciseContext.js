import React, { createContext, useState, useEffect } from "react";
import { fetchGoals, fetchMuscleGroups, fetchEquipmentItems } from "./../services/exerciseServices.js";
import { config } from "./../utils/config";

export const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState("");
  const [selectedExercise, setSelectedExercise] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [goals, setGoals] = useState([]);
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [equipmentItems, setEquipmentItems] = useState([]);

  useEffect(() => {
    const loadFilterData = async () => {
      try {
        setGoals(await fetchGoals());
        setMuscleGroups(await fetchMuscleGroups());
        setEquipmentItems(await fetchEquipmentItems());
      } catch (err) {
        setError(err.message);
      }
    };
    loadFilterData();
  }, []);

  // Function to fetch exercises - can be called to refresh data
  const fetchExercises = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/exercises`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch exercises");
      const data = await response.json();
      setExercises(data);
      setError("");
    } catch (err) {
      setError(err.message || "An error occurred while fetching exercises."); // Set error message
    }
  };

  const fetchExerciseDetails = async (exercise) => {
    try {
      const response = await fetch(`${config.backendUrl}/exercise/${exercise.exercise_id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch exercise details");
      const data = await response.json();

      // Parse and transform muscle_groups and equipment_items
      if (data.muscle_groups) {
        data.muscle_groups = JSON.parse(data.muscle_groups).map((group) => ({
          value: Object.keys(group)[0], // assuming first key is the identifier
          label: Object.values(group)[0], // assuming first value is the label
        }));
      }

      if (data.equipment_items) {
        data.equipment_items = JSON.parse(data.equipment_items).map((item) => ({
          value: Object.keys(item)[0], // assuming first key is the identifier
          label: Object.values(item)[0], // assuming first value is the label
        }));
      }

      setSelectedExercise(data);
      setError("");
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
        setError,
        goals,
        muscleGroups,
        equipmentItems,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};
