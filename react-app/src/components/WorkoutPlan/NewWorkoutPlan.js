import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import CreateExercise from "../CreateExercise";
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

const NewWorkoutPlan = ({ handleUploadSuccessChange , user_id, button}) => {
  // const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [workoutPlanSuccess, setWorkoutPlanSuccess] = useState(false);
  const [isLoadingWorkoutPlan, setIsLoadingWorkoutPlan] = useState(false);
  // In form just in case we add more values
  const [formData, setFormData] = useState({
    name: "",
    workout_plan_id: null,
    exercises: [],
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    const createWorkoutPlan = async () => {
        try{
            setIsLoadingWorkoutPlan(true);
            const data = {
                name : formData.name,
                author_id : Number(user_id),
            }
            const response = await fetch(`${config.backendUrl}/workout_plan/new`, {
                method: "POST",
                headers: {
                  // Moved data to body instead of headers
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include", // Include credentials with the request
            });
            if (!response.ok) {
                setError("Failed to Create Workout Plan")
                throw new Error(`Failed to create workout plan. Status: ${response.status}`);
            }
            console.log(response);
            const wp = await response.json();
            // Update only the workout_plan_id in formData
            setFormData((prevData) => ({
                ...prevData,
                workout_plan_id: wp.workout_plan.workout_plan_id,
            }));
            console.log(wp);
            setWorkoutPlanSuccess(true);
            handleUploadSuccessChange();
        } catch(err){
            console.log(err);
        } finally {
            setIsLoadingWorkoutPlan(false);
        }
        
    }

  const handleClose = () => {
    setFormData({
      name: "",
      workout_plan_id: null,
      exercises: [],
    });
    setError();
    setWorkoutPlanSuccess(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const addWorkoutExercise = (newExercise) => {
    setFormData((prevData) => ({
      ...prevData,
      exercises: [...prevData.exercises, newExercise],
    }));

    console.log(formData);
  };

    return (
        <>
            <div onClick={handleShow} className="d-inline" data-bs-toggle="modal" style={{ cursor: "pointer" }}>
                {button}
            </div>

      <Modal size="md" show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          {!workoutPlanSuccess ? (
            <>
              <Modal.Title>New Workout Plan</Modal.Title>
            </>
          ) : (
            <>
              <Modal.Title>Workout Plan Exercises</Modal.Title>
            </>
          )}
        </Modal.Header>
        <Modal.Body className="pb-0">
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <></>
          )}
          {!workoutPlanSuccess ? (
            <>
              <div className="mb-3">
                <label htmlFor="name" className="form-label ms-1">
                  Name
                </label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  aria-describedby="name"
                  placeholder="Workout plan name"
                />
              </div>
            </>
          ) : (
            <Table responsive hover>
              {formData.exercises.length > 0 ? (
                <>
                  <thead>
                    <tr>
                      <th>Exercise</th>
                      <th>Sets</th>
                      <th>Reps</th>
                      <th>Weight</th>
                      <th>Weekday</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.exercises.map((e, index) => (
                      <tr key={index}>
                        <td>{e.exercise_name || ""}</td>
                        <td>{e.num_sets || ""}</td>
                        <td>{e.reps_per_set || ""}</td>
                        <td>{e.weight ? `${e.weight} lbs` : ""}</td>
                        <td>{e.weekday ? e.weekday.charAt(0).toUpperCase() + e.weekday.slice(1) : ""}</td>
                        <td>{e.time ? convertTimeAMPM(e.time) : ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Click below to add an exercise to this workout plan
                  </td>
                </tr>
              )}
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!workoutPlanSuccess ? (
            <Button onClick={createWorkoutPlan} className="w-100" variant="dark">
              Save
            </Button>
          ) : (
            <CreateExercise workout_plan_id={formData.workout_plan_id} addWorkoutExercise={addWorkoutExercise} />
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewWorkoutPlan;
