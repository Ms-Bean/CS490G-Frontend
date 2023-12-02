import React from "react";

const ViewExerciseModal = ({ selectedExercise }) => {
  let muscleGroups = [];
  let equipmentItems = [];

  try {
    muscleGroups = selectedExercise.muscle_groups ? JSON.parse(selectedExercise.muscle_groups) : [];
    equipmentItems = selectedExercise.equipment_items ? JSON.parse(selectedExercise.equipment_items) : [];
  } catch (error) {
    console.error("Error parsing muscle groups or equipment items:", error);
  }

  const extractNames = (items) => items.map((item) => Object.keys(item)[0]).join(", ");

  return (
    <div>
      <p>
        <strong>Name:</strong> {selectedExercise.name}
      </p>
      <p>
        <strong>Description:</strong> {selectedExercise.description}
      </p>
      <p>
        <strong>Difficulty:</strong> {selectedExercise.difficulty}
      </p>
      <p>
        <strong>Goals:</strong> {selectedExercise.goal_name}
      </p>
      <p>
        <strong>Muscle Groups: </strong>
        {muscleGroups.length > 0 ? extractNames(muscleGroups) : "None"}
      </p>
      <p>
        <strong>Equipment: </strong>
        {equipmentItems.length > 0 ? extractNames(equipmentItems) : "None"}
      </p>
      <p>
        <strong>Video Link:</strong>{" "}
        <a href={selectedExercise.video_link} target="_blank" rel="noopener noreferrer">
          View Video
        </a>
      </p>
    </div>
  );
};

export default ViewExerciseModal;
