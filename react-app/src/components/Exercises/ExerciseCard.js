import React from "react";
import { Card, Col, Button, ButtonGroup } from "react-bootstrap";

const ExerciseCard = ({ exercise, onEdit, onInfo }) => {
  return (
    <Col md={3} className="mb-4">
      <Card className="bg-light" style={{ height: "20em" }}>
        <Card.Body>
          <Card.Title>{exercise.name}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <ButtonGroup className="w-100">
            <Button variant="secondary" onClick={() => onInfo(exercise)} className="">
              Info
            </Button>
            <Button variant="primary" onClick={() => onEdit(exercise)} className="">
              Edit
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ExerciseCard;
