import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import EditWorkoutPlan from "./EditWorkoutPlan";
import WorkoutPlanInfo from "./WorkoutPlanInfo";
import DeleteWorkoutPlan from "./DeleteWorkoutPlan";

const WorkoutPlanCard = ({ workoutPlanName, workoutPlanId, handleUploadSuccessChange }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleInfoModal = () => setShowInfoModal(!showInfoModal);
  const toggleEditModal = () => setShowEditModal(!showEditModal);
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  return (
    <>
      <div
        className="card bg-light"
        style={{ height: "15em" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="card-body">
          <h5 className="card-title">{workoutPlanName}</h5>
        </div>
        {isHovered && (
          <ButtonGroup className="w-100 px-2 pb-2">
            <Button variant="secondary" onClick={toggleInfoModal} className="w-25">
              Info
            </Button>
            <Button variant="primary" onClick={toggleEditModal} className="w-25">
              Edit
            </Button>
            <Button variant="danger" onClick={toggleDeleteModal} className="w-25">
              Delete
            </Button>
          </ButtonGroup>
        )}
        </div>
        <div>
        <WorkoutPlanInfo
          workoutPlanName={workoutPlanName}
          workoutPlanId={workoutPlanId}
          show={showInfoModal}
          handleClose={() => setShowInfoModal(false)}
        />
        <EditWorkoutPlan
          workoutPlanName={workoutPlanName}
          workoutPlanId={workoutPlanId}
          handleUploadSuccessChange={handleUploadSuccessChange}
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
        />
        <DeleteWorkoutPlan
          workoutPlanName={workoutPlanName}
          workoutPlanId={workoutPlanId}
          handleUploadSuccessChange={handleUploadSuccessChange}
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
        />
      </div>
    </>
  );
};

export default WorkoutPlanCard;
