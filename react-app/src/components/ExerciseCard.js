import React from "react";
import { Card, Col, Button } from "react-bootstrap";

const ExerciseCard = ({ exercise, onEdit, onInfo, onSelect, isSelected }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const cardClass = isSelected ? "selected-card" : "";

  return (
    <Col md={3} className={`mb-4 ${cardClass}`} onClick={onSelect}>
      <Card>
        <Card.Body>
          <Card.Title>
            <strong>{exercise.name}</strong>
          </Card.Title>
          {exercise.description && <Card.Text>Description: {truncateText(exercise.description, 50)}</Card.Text>}
          {isSelected && (
            <>
              <Button variant="secondary" onClick={() => onInfo(exercise)} className="me-2 w-auto">
                Info
              </Button>
              <Button variant="primary" onClick={() => onEdit(exercise)} className="me-2 w-auto">
                Edit
              </Button>
              <Button variant="danger" className="me-2 w-auto">
                Delete
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ExerciseCard;
