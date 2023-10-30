import React, { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./Registration";
import UserRoleSelection from "./UserRoleSelection";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import { AuthContext } from "./AuthContext";
import Onboarding from "./Onboarding";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);   

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
              {isLoggedIn ? ( // If isLoggedIn is true, show the following links
                <>
                  <Nav.Link href="#">Dashboard</Nav.Link>
                  <Nav.Link href="#">Goals</Nav.Link>
                  <Nav.Link href="#">Coaches</Nav.Link>
                  <Nav.Link href="#">Workouts</Nav.Link>
                  <Nav.Link href="#">Messaging</Nav.Link>
                  <Nav.Link href="#">Profile</Nav.Link>
                  <Nav.Link href="/logout">Logout</Nav.Link>
                </>
              ) : ( // If isLoggedIn is false, show the following links
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/registration">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/role" element={<UserRoleSelection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/onboard" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
