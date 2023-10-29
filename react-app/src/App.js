import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./Registration";
import UserRoleSelection from "./UserRoleSelection";
import HomePage from "./HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <h1>Moxi</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* 
                Adding New Pages to the Navbar:
                1. Import the component of the new page at the top of this file.
                2. Add a new <NavDropdown.Item> or <Nav.Link> here with the appropriate 'href'.
              */}
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="/registration">Registration</NavDropdown.Item>
                {/* Add more NavDropdown.Item here for additional pages in the dropdown */}
              </NavDropdown>
              {/* Add more Nav.Link here for additional standalone pages */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        {/* 
          Adding New Routes:
          1. Make sure you have imported the component of the new page at the top of this file.
          2. Add a new <Route> element.
        */}
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/role" element={<UserRoleSelection />} />
        {/* Add more Route here for additional pages */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
