import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const DashboardNavbar = ({ onTabSelect, isDisabled }) => {
  return (
    <Navbar variant="dark" bg="dark" expand="lg" className={`secondary-navbar ${isDisabled ? 'disabled-navbar' : ''}`}>
      <Container>
        <Navbar.Brand href="#">Dashboard</Navbar.Brand>
        <Nav className="me-auto justify-content-center" style={{ flex: 1 }}>
          {/* ADMIN VIEW? <Nav.Link href="#weeklyView" onClick={() => !isDisabled && onTabSelect('weeklyView')} disabled={isDisabled}>Weekly View</Nav.Link> */}
          <Nav.Link href="#weeklyView" onClick={() => !isDisabled && onTabSelect('weeklyView')} disabled={isDisabled}>Weekly View</Nav.Link>
          <Nav.Link href="#statisticsView" onClick={() => !isDisabled && onTabSelect('statisticsView')} disabled={isDisabled}>Statistics View</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
