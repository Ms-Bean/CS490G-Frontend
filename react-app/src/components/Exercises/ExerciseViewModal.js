import React from "react";
import { Container } from "react-bootstrap";
import YouTube from "react-youtube";
import "./../../css/ExerciseBank.css";

const ViewExerciseModal = ({ selectedExercise }) => {
  const extractLabels = (items) => items.map((item) => item.label).join(", ");

  const getYouTubeVideoId = (url) => {
    if (!url) return null;

    const regExp = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
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
    <Container>
      <Container className="youtube-container mb-2">
        <p>{videoId && <YouTube videoId={videoId} opts={options} />}</p>
      </Container>
      <p className="my-2">
        {selectedExercise.description}
      </p>
      <p className="my-0">
        <strong>Difficulty:</strong> {selectedExercise.difficulty}
      </p>
      <p className="my-0">
        <strong>Fitness Goals:</strong> {selectedExercise.goal_name}
      </p>
      <p className="my-0">
        <strong>Muscle Groups: </strong>
        {selectedExercise.muscle_groups?.length > 0 ? extractLabels(selectedExercise.muscle_groups) : "None"}
      </p>
      <p className="my-0">
        <strong>Equipment: </strong>
        {selectedExercise.equipment_items?.length > 0 ? extractLabels(selectedExercise.equipment_items) : "None"}
      </p>
    </Container>
  );
};

export default ViewExerciseModal;
