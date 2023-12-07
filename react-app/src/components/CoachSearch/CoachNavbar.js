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
            <span className="navbar-text-link align-self-center" variant="secondary" type="submit">
              <FaSearch />
            </span>
            <span className="navbar-text-link align-self-center" style={{ cursor: "pointer" }} onClick={handleModalShow}>
              Filter By ▾
            </span>
            <Dropdown className="navbar-text-link align-self-center">
              <Dropdown.Toggle as="span" id="dropdown-basic-button" style={{ cursor: "pointer" }}>
                Sort By ▾
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
