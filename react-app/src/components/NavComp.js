import React from "react";
import "./NavComp.css";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";
import profPic from "./m&m.jpeg";

const NavComp = () => {
  const {user} = useAuth();
  const {logout} = useLogout();
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
            {user && (
              <>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="#">Goals</Nav.Link>
                <Nav.Link href="#">Coaches</Nav.Link>
                <Nav.Link href="#">Workouts</Nav.Link>
                <Nav.Link href="#">Messaging</Nav.Link>
                <NavDropdown
                  eventkey={1} // eventKey={1} is deprecated
                  title={
                    <div className="pull-left">
                      <img className="thumbnail-image" src={profPic} alt="Profile Picture" height="30" width="30" />
                    </div>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#">Account</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {!user && (
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
