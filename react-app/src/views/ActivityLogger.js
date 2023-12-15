import React, { useState } from "react";
import WorkoutProgress from "../components/WorkoutPlan/WorkoutProgress";

const WorkoutPlanCard = ({ workoutPlanName, workoutPlanId, handleUploadSuccessChange }) => {
  const [showLogModal, setShowLogModal] = useState(false);

  return (
    <>
        <div>
        <WorkoutProgress
          workoutPlanName={"TestTest"}
          workoutPlanId={"25"}
          handleUploadSuccessChange={handleUploadSuccessChange}
          show={true}
          handleClose={() => setShowLogModal(false)}
        />
      </div>
    </>
  );
};

export default WorkoutPlanCard;