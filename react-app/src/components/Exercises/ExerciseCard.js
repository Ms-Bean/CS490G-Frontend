import React, { useState, useContext } from "react";
import { Card, Col, Button, ButtonGroup } from "react-bootstrap";
import { ExerciseContext } from "../../context/exerciseContext";

const ExerciseCard = ({ exercise, isAdmin }) => {
  const { handleInfoOrEdit } = useContext(ExerciseContext);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Col md={3} className="mb-4">
      <Card
        className="bg-light"
        style={{ height: "15em" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card.Body>
          <Card.Title>{exercise.name}</Card.Title>
        </Card.Body>
        {isHovered && (
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
        )}
      </Card>
    </Col>
  );
};

export default ExerciseCard;
