import React from 'react';

const ViewExerciseModal = ({ selectedExercise }) => (
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
        {selectedExercise.muscle_groups ? selectedExercise.muscle_groups.split(",").join(", ") : "None"}
      </p>
      <p>
        <strong>Equipment: </strong>
        {selectedExercise.equipment_items ? selectedExercise.equipment_items.split(",").join(", ") : "None"}
      </p>
      <p>
        <strong>Video Link:</strong>{" "}
        <a href={selectedExercise.video_link} target="_blank" rel="noopener noreferrer">
          View Video
        </a>
      </p>
    </div>
  );

export default ViewExerciseModal;
