import React from "react";

const ViewExerciseModal = ({ selectedExercise }) => {
  const extractLabels = (items) => items.map((item) => item.label).join(", ");

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
        {selectedExercise.muscle_groups?.length > 0 ? extractLabels(selectedExercise.muscle_groups) : "None"}
      </p>
      <p>
        <strong>Equipment: </strong>
        {selectedExercise.equipment_items?.length > 0 ? extractLabels(selectedExercise.equipment_items) : "None"}
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
