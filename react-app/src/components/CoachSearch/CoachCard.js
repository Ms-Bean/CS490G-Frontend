import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const CoachCard = ({ coach }) => {
  // Function to truncate text with a maximum length
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Col md={4} className="mb-4">
      <Card>
        <Card.Body className="pb-1">
          <Card.Title>
            <strong>
              {coach.personal_info.first_name} {coach.personal_info.last_name}
            </strong>
          </Card.Title>
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
            <strong>Coaching History:</strong> {truncateText(coach.professional_info.coaching_history || "Not provided", 50)}
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CoachCard;
