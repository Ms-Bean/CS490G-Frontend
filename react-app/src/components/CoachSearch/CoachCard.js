import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const CoachCard = ({ coach }) => {
  return (
    <Col md={4} className="mb-4">
      <Card>
        <Card.Body className="pb-1">
          <Card.Title>
            {coach.personal_info.first_name} {coach.personal_info.last_name}
          </Card.Title>
          <Row>
            <Col md={6}>
              <p>
                <strong>Experience:</strong> {coach.professional_info.experience_level} years
              </p>
              <p>
                <strong>Hourly Rate:</strong> ${coach.professional_info.hourly_rate.toFixed(2)}
              </p>
              <p>
                <strong>Accepting New Clients:</strong> {coach.professional_info.accepting_new_clients ? "Yes" : "No"}
              </p>
              <p>
                <strong>Coaching History:</strong> {coach.professional_info.coaching_history || "Not provided"}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CoachCard;
