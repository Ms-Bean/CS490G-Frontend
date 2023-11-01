import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const url = "http://localhost:3500/";

const UserRoleSelection = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setUserRole(role);
  };

  // TODO: Remove since both lead to same page
  const handleContinue = async(e) => {

    try {
      const response = await fetch(`${url}assign_role/`, {
        method: "POST",
        headers: { // Moved data to body instead of headers
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_coach: userRole==='coach'
        }),
        credentials: "include", // Include credentials with the request
      });
      const data = await response.json();

    } catch (err) {
      console.error("Error occurred:", err);
    }
    if (userRole === 'coach') {
      navigate('/onboard');
    } else if (userRole === 'client') {
      navigate('/onboard');
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <h3 className="text-center mb-4">Select Your Role</h3>
          <Row>
            {/* Coach Card */}
            <Col>
              <Card
                className={`p-3 ${userRole === 'coach' ? 'bg-primary text-white' : ''}`}
                onClick={() => handleRoleChange('coach')}
              >
                <Card.Title>Coach</Card.Title>
                <Card.Text>Become a coach and guide others.</Card.Text>
              </Card>
            </Col>

            {/* Client Card */}
            <Col>
              <Card
                className={`p-3 ${userRole === 'client' ? 'bg-primary text-white' : ''}`}
                onClick={() => handleRoleChange('client')}
              >
                <Card.Title>Client</Card.Title>
                <Card.Text>Join as a client and get guidance.</Card.Text>
              </Card>
            </Col>
          </Row>

          <Button
            className="mt-3 d-block mx-auto"
            variant={userRole ? 'primary' : 'secondary'}
            disabled={!userRole}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserRoleSelection;
