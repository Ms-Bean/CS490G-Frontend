import React from "react";
import { Container } from "react-bootstrap";
import YouTube from "react-youtube";
import "./../../css/ExerciseBank.css";

const ViewExerciseModal = ({ selectedExercise }) => {
  const extractLabels = (items) => items.map((item) => item.label).join(", ");

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
  
    const regExp = /https:\/\/www\.youtube\.com\/watch\?v=(\d+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };
  
  const videoId = getYouTubeVideoId(selectedExercise.video_link);

  const options = {
    playerVars: {
      autoplay: 0,
      controls: 0,
    },
  };

  return (
    <div>
      <Container className="youtube-container">
      {videoId && <YouTube videoId={videoId} opts={options} />}
      </Container>
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
        <strong>Fitness Goals:</strong> {selectedExercise.goal_name}
      </p>
      <p>
        <strong>Muscle Groups: </strong>
        {selectedExercise.muscle_groups?.length > 0 ? extractLabels(selectedExercise.muscle_groups) : "None"}
      </p>
      <p>
        <strong>Equipment: </strong>
        {selectedExercise.equipment_items?.length > 0 ? extractLabels(selectedExercise.equipment_items) : "None"}
      </p>
    </div>
  );
};

export default ViewExerciseModal;
