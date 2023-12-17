import React from "react";
import "../css/NavComp.css";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";

const NavComp = () => {
  const { user } = useAuth();
  const { logout } = useLogout();
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
    <Navbar className="main-navbar py-0" expand="lg" sticky="top" bg="white">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Image src="/logo_moxi.png" alt="Logo" />
          <div className="brand">moxi</div>
        </Navbar.Brand>

        <Navbar.Toggle  aria-controls="navbarScroll" />
        <Navbar.Collapse  id="navbarScroll">
          <Nav className="ms-auto nav-links">
            {user ? (
              <>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/workout_plan">Workouts</Nav.Link>
                <Nav.Link href="/exercise_management">Exercises</Nav.Link>
                <Nav.Link href="/coaches">Trainers</Nav.Link>
                <Nav.Link href="/messages">Messages</Nav.Link>
                <Nav.Link href="/your_trainer">Your trainer</Nav.Link>
                <NavDropdown className="align-self-center"
                  title={<Image className="thumbnail-image" roundedCircle  src="/profilepic.jpg" alt="Profile Picture" />}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={() => navigate("/profile")}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/account")}>
                    Account
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/exercise_management">Exercises</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/registration">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavComp;
