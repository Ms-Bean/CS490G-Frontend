import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const DashboardNavbar = ({ onTabSelect, isDisabled, currentTab, userRole }) => {
  const isAdminOrCoach = userRole === 'admin' || userRole === 'coach';

  return (
    <Navbar variant="dark" bg="dark" expand="lg" className={`secondary-navbar ${isDisabled ? 'disabled-navbar' : ''}`}>
      <Container>
        <Navbar.Brand href="#">Dashboard</Navbar.Brand>
        <Nav className="me-auto justify-content-center" style={{ flex: 1 }}>
        {isAdminOrCoach && (
            <Nav.Link 
              href="#coachClientDashboard" 
              onClick={() => !isDisabled && onTabSelect('coachClientDashboard')} 
              active={currentTab === 'coachClientDashboard'}
              disabled={isDisabled}>
              Trainer View
            </Nav.Link>
          )}
          <Nav.Link 
            href="#weeklyView" 
            onClick={() => !isDisabled && onTabSelect('weeklyView')} 
            active={currentTab === 'weeklyView'}
            disabled={isDisabled}>
            This Week
          </Nav.Link>
          <Nav.Link 
            href="#statisticsView" 
            onClick={() => !isDisabled && onTabSelect('statisticsView')} 
            active={currentTab === 'statisticsView'}
            disabled={isDisabled}>
            Statistics
          </Nav.Link>
          <Nav.Link 
            href="#dailySurvey" 
            onClick={() => !isDisabled && onTabSelect('dailySurvey')} 
            active={currentTab === 'dailySurvey'}
            disabled={isDisabled}>
            Daily Survey
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
