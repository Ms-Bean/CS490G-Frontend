import React from "react";
import { Navbar, Button, Container } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import ExerciseAddModal from "./ExerciseAddModal";

const ExerciseNavbar = ({ onAddExercise }) => {
  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="secondary-navbar">
      <Container>
        <Navbar.Brand>Exercise Bank</Navbar.Brand>
        <ExerciseAddModal/>
        <Navbar.Toggle aria-controls="navbarScroll" />
      </Container>
    </Navbar>
  );
};

export default ExerciseNavbar;
