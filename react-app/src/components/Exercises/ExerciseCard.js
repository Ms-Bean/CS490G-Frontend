import React, { useContext } from 'react';
import { Card, Col, Button, ButtonGroup } from "react-bootstrap";
import { ExerciseContext } from "../../context/exerciseContext";

const ExerciseCard = ({ exercise, isAdmin }) => {
  const { handleInfoOrEdit } = useContext(ExerciseContext);

  return (
    <Col md={3} className="mb-4">
      <Card className="bg-light" style={{ height: "20em" }}>
        <Card.Body>
          <Card.Title>{exercise.name}</Card.Title>
        </Card.Body>
        <ButtonGroup className="w-100 p-2">
          <Button variant="secondary" onClick={() => handleInfoOrEdit(exercise, "view")}>
            Info
          </Button>
          {isAdmin && (
            <Button variant="primary" onClick={() => handleInfoOrEdit(exercise, "edit")}>
              Edit
            </Button>
          )}
        </ButtonGroup>
      </Card>
    </Col>
  );
};

export default ExerciseCard;
