import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Dropdown, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import ExerciseAddModal from "./ExerciseAddModal";
import ExerciseFilterModal from "./ExerciseFilterModal";

const ExerciseNavbar = ({ onSearch, onSort, onToggleSortDirection, sortKey, sortDirection, isAdmin, onFilter }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleFilterClick = () => {
    setShowFilterModal(true);
  };

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleSortOptionClick = (key) => {
    if (sortKey === key) {
      onToggleSortDirection();
    } else {
      onSort(key);
    }
  };

  const getSortDirectionSymbol = (key) => {
    return sortKey === key ? (sortDirection === "ascending" ? " ↑" : " ↓") : "";
  };

  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="secondary-navbar">
      <Container>
        <Navbar.Brand href="#">Exercise Bank</Navbar.Brand>
        {isAdmin && <ExerciseAddModal />}

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" />
          <Form className="d-flex">
            
            <FormControl type="text" placeholder="Search by name..." name="name" className="me-2" onChange={handleSearchChange} />
            <span className="navbar-text-link align-self-center" variant="secondary" type="submit">
              <FaSearch />
            </span>
            <span className="navbar-text-link align-self-center" style={{ cursor: "pointer" }} onClick={() => setShowFilterModal(true)}>
              Filter By ▾
            </span>
            <ExerciseFilterModal show={showFilterModal} onHide={() => setShowFilterModal(false)} onApplyFilter={onFilter} />
            <Dropdown className="navbar-text-link align-self-center">
              <Dropdown.Toggle as="span" id="dropdown-basic-button" style={{ cursor: "pointer" }}>
                Sort By ▾
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="name" onClick={() => handleSortOptionClick("name")}>
                  Name{getSortDirectionSymbol("name")}
                </Dropdown.Item>
                <Dropdown.Item eventKey="difficulty" onClick={() => handleSortOptionClick("difficulty")}>
                  Difficulty{getSortDirectionSymbol("difficulty")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ExerciseNavbar;
