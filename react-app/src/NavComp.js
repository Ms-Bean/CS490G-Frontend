import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { AuthContext } from "./AuthContext";

const NavComp = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/login");
    } else {
      console.error("Logout failed"); 
    }
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <h1>Moxi</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? ( // Check localUser instead of user 
              <>
                <Nav.Link href="#">Dashboard</Nav.Link>
                <Nav.Link href="#">Goals</Nav.Link>
                <Nav.Link href="#">Coaches</Nav.Link>
                <Nav.Link href="#">Workouts</Nav.Link>
                <Nav.Link href="#">Messaging</Nav.Link>
                <Nav.Link href="#">Profile</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              // If user is null, show the following links
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/registration">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavComp;
