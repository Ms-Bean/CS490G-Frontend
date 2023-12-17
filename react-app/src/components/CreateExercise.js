import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { config } from "./../utils/config";

function CreateExercise({ addTag, workout_plan_id, addWorkoutExercise }) {
  const [error, setError] = useState("");
  const [showExercise, setShowExercise] = useState(false);
  const [exerciseBank, setExerciseBank] = useState([]);
  const [exerciseFormData, setExerciseFormData] = useState({
    workout_plan_id: workout_plan_id,
    exercise_id: "",
    weekday: "",
    time: "",
    reps_per_set: "",
    num_sets: "",
    weight: "",
  });

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/exercises`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch the Exercise Bank");
        const data = await response.json();
        setExerciseBank(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchExercises();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExerciseFormData({ ...exerciseFormData, [name]: value });
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    if (name === "time") {
      console.log("time here ");
    }
    console.log("name ", name, "value ", value);
    const selectedOption = event.target.value;
    setExerciseFormData({ ...exerciseFormData, [name]: selectedOption });

    console.log(exerciseFormData);
  };


  const handleExerciseClose = () => {
    setExerciseFormData({
      workout_plan_id: workout_plan_id,
      exercise_id: "",
      weekday: "",
      time: "",
      reps_per_set: "",
      num_sets: "",
      weight: "",
    });
    setShowExercise(false);
  };

  const handleExerciseShow = () => setShowExercise(true);

  const handleAddExercise = async () => {
    try {
      const ex = exerciseBank.find((e) => e.exercise_id === Number(exerciseFormData.exercise_id));
      if (!ex) {
        setError("Exercise not found in the bank.");
        return;
      }

      const data = {
        workout_plan_id: exerciseFormData.workout_plan_id,
        exercise_name: ex.name,
        exercise_id: Number(exerciseFormData.exercise_id),
        weekday: exerciseFormData.weekday,
        time: exerciseFormData.time + ":00",
        reps_per_set: exerciseFormData.reps_per_set === "" ? null : Number(exerciseFormData.reps_per_set),
        num_sets: exerciseFormData.num_sets === "" ? null : Number(exerciseFormData.num_sets),
        weight: exerciseFormData.weight === "" ? null : Number(exerciseFormData.weight),
      };

      const response = await fetch(`${config.backendUrl}/workout_plan/${workout_plan_id}/exercise/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add exercise. Please try again.");
        return;
      }

      addWorkoutExercise({
        workout_plan_id: exerciseFormData.workout_plan_id,
        exercise_name: ex.name,
        exercise_id: Number(exerciseFormData.exercise_id),
        weekday: exerciseFormData.weekday,
        time: exerciseFormData.time + ":00",
        reps_per_set: Number(exerciseFormData.reps_per_set),
        num_sets: Number(exerciseFormData.num_sets),
        weight: Number(exerciseFormData.weight),
      });
      
      setExerciseFormData({
        workout_plan_id: workout_plan_id,
      });
      setShowExercise(false);
      setError(""); // Clear error on successful submission
    } catch (err) {
      setError("An error occurred while adding the exercise.");
      console.log(err);
    }
  };

  return (
    <>
      <button type="button" onClick={handleExerciseShow} className="w-100 bg-dark text-light my-2 btn">
        Add Exercise
      </button>

      <Modal show={showExercise} onHide={handleExerciseClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Schedule an Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <form>
            <div className="mb-3">
              <label htmlFor="exercise_id" className="form-label">
                Exercise
              </label>
              <select className="form-select" name="exercise_id" value={exerciseFormData.exercise_id} onChange={handleSelectChange}>
                <option value="">Select a workout</option>
                {exerciseBank.map((exercise, index) => (
                  <option key={index} value={exercise.exercise_id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="weekday" className="form-label">
                Weekday
              </label>
              <select className="form-select" name="weekday" value={exerciseFormData.weekday} onChange={handleSelectChange}>
                <option value="">Select a weekday</option>
                <option key="weekday-0" value="monday">
                  Monday
                </option>
                <option key="weekday-1" value="tuesday">
                  Tuesday
                </option>
                <option key="weekday-2" value="wednesday">
                  Wednesday
                </option>
                <option key="weekday-3" value="thursday">
                  Thursday
                </option>
                <option key="weekday-4" value="friday">
                  Friday
                </option>
                <option key="weekday-5" value="saturday">
                  Saturday
                </option>
                <option key="weekday-6" value="sunday">
                  Sunday
                </option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <input type="time" name="time" className="form-control" value={exerciseFormData.time} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="reps_per_set" className="form-label">
                Reps Per Set
              </label>
              <input
                type="number"
                name="reps_per_set"
                className="form-control"
                value={exerciseFormData.reps_per_set}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="num_sets" className="form-label">
                Number of Sets
              </label>
              <input
                type="number"
                name="num_sets"
                className="form-control"
                value={exerciseFormData.num_sets}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">
                Weight
              </label>
              <input type="number" name="weight" className="form-control" value={exerciseFormData.weight} onChange={handleInputChange} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="w-100"
            variant="dark"
            onClick={handleAddExercise}
            disabled={!exerciseFormData.exercise_id || !exerciseFormData.weekday || !exerciseFormData.time}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateExercise;
