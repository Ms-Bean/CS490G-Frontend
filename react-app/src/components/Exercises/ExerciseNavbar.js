import React from "react";
import { Navbar, Button, Container } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const ExerciseNavbar = ({ onAddExercise }) => {
  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="secondary-navbar">
      <Container>
        <Navbar.Brand>Exercise Bank</Navbar.Brand>
        <Button variant="outline-light" className="ms-3" onClick={onAddExercise}>
            <FaPlus />
          </Button>
        <Navbar.Toggle aria-controls="navbarScroll" />
      </Container>
    </Navbar>
  );
};

export default ExerciseNavbar;
