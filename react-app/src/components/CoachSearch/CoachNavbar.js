import React from "react";
import { Navbar, Nav, Form, FormControl, Button, Dropdown, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const CoachNavbar = ({ searchParams, handleChange, handleSubmit, handleModalShow, handleSortChange, getSortDirectionIcon }) => {
  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="secondary-navbar">
      <Container>
        <Navbar.Brand>Personal Trainers</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" />

          <Form className="d-flex" onSubmit={handleSubmit}>
            <FormControl
              type="text"
              placeholder="Search by name..."
              name="name"
              value={searchParams.name}
              onChange={handleChange}
              className="me-2"
            />
            <Button variant="secondary" type="submit">
              <FaSearch />
            </Button>
            <Button variant="secondary" onClick={handleModalShow} className="ms-2">
              Filters
            </Button>
            <Dropdown variant="secondary" className="ms-2">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
                Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange("name")}>Name{getSortDirectionIcon("name")}</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("hourly_rate")}>
                  Hourly Rate{getSortDirectionIcon("hourly_rate")}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("experience_level")}>
                  Experience{getSortDirectionIcon("experience_level")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CoachNavbar;
