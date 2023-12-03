import React from "react";
import { Card, Col, Button, ButtonGroup } from "react-bootstrap";

const CoachCard = ({ coach }) => {
  // Function to truncate text with a maximum length
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Col md={3} className="mb-4">
      <Card className="bg-light" style={{ height: "20em" }}>
        <Card.Body>
          <Card.Title>
            {coach.personal_info.first_name} {coach.personal_info.last_name}
          </Card.Title>
          {/* <p>
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
          </p> */}
        </Card.Body>
        <ButtonGroup className="w-100 p-2">
          <Button variant="secondary">Info</Button>
        </ButtonGroup>
      </Card>
    </Col>
  );
};

export default CoachCard;
