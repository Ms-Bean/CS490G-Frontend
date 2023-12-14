import React from "react";
import { ButtonGroup } from "react-bootstrap";
import CoachInfo from "./CoachInfo";
import AcceptCoach from "./AcceptCoach";
import RejectCoach from "./RejectCoach";

const CoachCard = ({ coach, handleUploadSuccessChange}) => {
  return (
    <div className="card bg-light" style={{ height: "20em" }}>
      <div className="card-body">
        <h5 className="card-title">{coach.firstName} {coach.lastName}</h5>
      </div>
      <CoachInfo coach={coach} />
      <ButtonGroup className="w-100 px-2 pb-2">
        <AcceptCoach user_id={coach.userId} handleUploadSuccessChange={handleUploadSuccessChange} firstName={coach.firstName}/>
        <RejectCoach user_id={coach.userId} handleUploadSuccessChange={handleUploadSuccessChange} firstName={coach.firstName}/>
      </ButtonGroup>
    </div>
  );
};

export default CoachCard;