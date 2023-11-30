import React from "react";
import { Card, Col, Button } from "react-bootstrap";

const ExerciseCard = ({ exercise, onEdit }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Col md={4} className="mb-4">
      <Card>
        <Card.Body>
          <Card.Title><strong>{exercise.name}</strong></Card.Title>
          <Card.Text>Difficulty: {exercise.difficulty}</Card.Text>
          {exercise.description && (
            <Card.Text>Description: {truncateText(exercise.description, 50)}</Card.Text>
          )}
          {exercise.video_link && (
            <Card.Link href={exercise.video_link} target="_blank">Watch Video</Card.Link>
          )}
          <Button variant="secondary" className="me-2" onClick={() => alert("Info clicked!")}>Info</Button>
          <Button variant="primary" onClick={() => onEdit(exercise)}>Edit</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ExerciseCard;
