import React from "react";
import "../css/NavComp.css";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";
import profPic from "./static_images/default-avatar-profile-icon-of-social-media-user-vector.jpg";

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
                <Nav.Link href="/coaches">Coaches</Nav.Link>
                <Nav.Link href="#">Workouts</Nav.Link>
                <Nav.Link href="/messages">Messaging</Nav.Link>
                <NavDropdown
                  eventkey={1} // eventKey={1} is deprecated
                  title={
                      <Image className="thumbnail-image" roundedCircle src={profPic} alt="Profile Picture" height="25" width="25" />
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={() => navigate('/profile')} href="#">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate('/account')} href="#">Account</NavDropdown.Item>
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
