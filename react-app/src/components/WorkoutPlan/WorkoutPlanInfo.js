import { useState, useEffect } from "react";
import { Table, Modal, Alert } from "react-bootstrap";
import { config } from "./../../utils/config";

const convertTimeAMPM = (time) => {
  const t = time.split(":");

  const hours = Number(t[0]);
  const mins = Number(t[1]);
  const sec = Number(t[2]);

  // calculate
  let timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
  } else if (hours > 12) {
    timeValue = "" + (hours - 12);
  } else if (hours == 0) {
    timeValue = "12";
  }

  timeValue += mins < 10 ? ":0" + mins : ":" + mins;
  // timeValue += (sec < 10) ? ":0" + sec : ":" + sec;
  timeValue += hours >= 12 ? " P.M." : " A.M.";

  // show
  return timeValue;
};

// const tempGoals = ["Build Muscle", "Improve Endurance", , "Reduce Body Fat Percentage", "Improve Posture"];

function WorkoutPlanInfo({ workoutPlanName, workoutPlanId, show, handleClose }) {
  const weekdayOrder = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/workout_plan/${workoutPlanId}?include_exercises=true`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setExercises(data.workout_plan.exercises);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (show) {
      fetchExercises();
    }
  }, [show, workoutPlanId]);

  exercises.sort((a, b) => {
    return weekdayOrder.indexOf(a.weekday) - weekdayOrder.indexOf(b.weekday);
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size={"lg"}>
        <Modal.Header className="text-center" closeButton>
          <Modal.Title className="w-100">{workoutPlanName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-0">
          {/* <div className="mx-auto">
            <strong>xTEMPx Fitness Goals</strong>:
            {tempGoals.map((goal, index) => (
              <span className="ms-1" key={`goal-${index}`}>
                {goal ? `${goal},` : ""}
              </span>
            ))}
          </div> */}
          {exercises.length === 0 ? (
            <Alert variant="info" className=" align-items-center my-2">
              <h5> No Exercises Planned</h5>
              Plan an workout by clicking edit on the workout plan card
            </Alert>
          ) : (
            <div className="mt-3">
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Exercise Name</th>
                    <th>Time</th>
                    <th>Day</th>
                    <th>Sets x Reps</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((e, index) => (
                    <tr key={index}>
                      <td>{e.exercise.name || ""}</td>
                      <td>{e.time ? convertTimeAMPM(e.time) : ""}</td>
                      <td>{e.weekday ? e.weekday.charAt(0).toUpperCase() + e.weekday.slice(1) : ""}</td>
                      <td>{e.num_sets && e.reps_per_set ? `${e.num_sets}x${e.reps_per_set}` : ""}</td>
                      <td>{e.weight ? `${e.weight} lbs` : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary w-100" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WorkoutPlanInfo;
