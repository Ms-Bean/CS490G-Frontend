import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
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

const tempGoals = ["Build Muscle", "Improve Endurance", , "Reduce Body Fat Percentage", "Improve Posture"];

function WorkoutPlanInfo({ workoutPlanName, workoutPlanId }) {
  const weekdayOrder = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const [exercises, setExercises] = useState([]);
  const [show, setShow] = useState(false);

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
    fetchExercises();
  }, [workoutPlanId]); // Adding workoutPlanId as a dependency to refetch if the ID changes

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    fetchExercises(); // Fetch exercises every time the info button is clicked
  };

  exercises.sort((a, b) => {
    return weekdayOrder.indexOf(a.weekday) - weekdayOrder.indexOf(b.weekday);
  });

  return (
    <>
      <button onClick={handleShow} className="btn btn-secondary rounded-bottom-0">
        Info
      </button>

      <Modal show={show} onHide={handleClose} centered size={"lg"}>
        <Modal.Header className="text-center" closeButton>
          <Modal.Title className="w-100">{workoutPlanName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <div className="mx-auto">
            <strong>xTEMPx Fitness Goals</strong>:
            {tempGoals.map((goal, index) => (
              <span className="ms-1" key={`goal-${index}`}>
                {goal ? `${goal},` : ""}
              </span>
            ))}
          </div>
          {exercises.length === 0 ? (
            <div className="container d-flex justify-content-center align-items-center my-2">
              <div className="w-50 d-flex flex-column justify-content-center align-items-center border border-black shadow rounded p-2 my-2">
                <h6> No Exercises Yet</h6>
                <small>Create an Exercise by Clicking on the Edit Button</small>
              </div>
            </div>
          ) : (
            <div className="mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>Exercise Name</th>
                    <th>Time</th>
                    <th>Day</th>
                    <th>Reps x Sets</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((e, index) => (
                    <tr key={index}>
                      <td>{e.exercise.name || ""}</td>
                      <td>{e.time ? convertTimeAMPM(e.time) : ""}</td>
                      <td>{e.weekday ? e.weekday.charAt(0).toUpperCase() + e.weekday.slice(1) : ""}</td>
                      <td>{e.reps_per_set && e.num_sets ? `${e.reps_per_set}x${e.num_sets}` : ""}</td>
                      <td>{e.weight ? `${e.weight} lbs` : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default WorkoutPlanInfo;
