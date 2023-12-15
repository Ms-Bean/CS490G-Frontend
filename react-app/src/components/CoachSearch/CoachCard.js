import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Button, ButtonGroup } from "react-bootstrap";
import ViewCoachProfile from "./ViewCoachProfile";

const CoachCard = ({ coach, handleUploadSuccessChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Col md={3} className="mb-4">
      <Card
        className="bg-light"
        style={{ height: "15em" }}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
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
        <ButtonGroup className="w-100 p-2">
          <ViewCoachProfile coach={coach} handleUploadSuccessChange={handleUploadSuccessChange}/>
        </ButtonGroup>

      </Card>
    </Col>
  );
};

export default CoachCard;
