import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Button, ButtonGroup } from "react-bootstrap";

const CoachCard = ({ coach }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleInfoClick = () => {
    navigate(`/coach_id=${coach.coach_id}`); // Navigate to coach's user page
  };

  return (
    <Col md={3} className="mb-4">
      <Card
        className="bg-light"
        style={{ height: "15em" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {" "}
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
        {isHovered && (
          <ButtonGroup className="w-100 p-2">
            <Button variant="secondary" onClick={handleInfoClick}>
              Info
            </Button>
          </ButtonGroup>
        )}
      </Card>
    </Col>
  );
};

export default CoachCard;
