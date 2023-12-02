import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Dropdown, Container } from "react-bootstrap";
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
        <Navbar.Brand>
          Exercise Bank
          {isAdmin && <ExerciseAddModal />}
        </Navbar.Brand>

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" />

          <Form className="d-flex">
            <FormControl type="text" placeholder="Search by name..." name="name" className="me-2" onChange={handleSearchChange} />
            <Button variant="secondary">
              <FaSearch />
            </Button>
            <Button variant="secondary" className="ms-2" onClick={handleFilterClick}>
              Filters
            </Button>
            <ExerciseFilterModal show={showFilterModal} onHide={() => setShowFilterModal(false)} onApplyFilter={onFilter} />
            <Dropdown variant="secondary" className="ms-2" onSelect={handleSortOptionClick}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
                Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="name">Name{getSortDirectionSymbol("name")}</Dropdown.Item>
                <Dropdown.Item eventKey="difficulty">Difficulty{getSortDirectionSymbol("difficulty")}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
  );
};


export default ExerciseNavbar;
