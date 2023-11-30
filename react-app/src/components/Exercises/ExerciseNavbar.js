import React from "react";
import { Navbar, Nav, Form, FormControl, Button, Dropdown, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const ExerciseNavbar = () => {
  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="secondary-navbar">
      <Container>
        <Navbar.Brand>Exercise Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
      </Container>
    </Navbar>
  );
};

export default ExerciseNavbar;
