import React from "react";
import { Navbar, Nav, Form, FormControl, Button, Dropdown, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import ExerciseAddModal from "./ExerciseAddModal";

const ExerciseNavbar = () => {
  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="secondary-navbar">
      <Container>
        <Navbar.Brand>
          Exercise Bank
          <ExerciseAddModal />
        </Navbar.Brand>

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" />

          <Form className="d-flex">
            <FormControl type="text" placeholder="Search by name..." name="name" className="me-2" />
            <Button variant="secondary" type="submit">
              <FaSearch />
            </Button>
            <Button variant="secondary" className="ms-2">
              Filters
            </Button>
            <Dropdown variant="secondary" className="ms-2">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
                Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Name</Dropdown.Item>
                <Dropdown.Item>Difficulty</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ExerciseNavbar;
