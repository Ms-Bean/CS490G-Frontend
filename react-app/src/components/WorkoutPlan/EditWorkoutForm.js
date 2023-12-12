import { useState, useEffect } from "react";
import { Button, ButtonGroup, Table, Form, Row, Col } from "react-bootstrap";
import { config } from "./../../utils/config";

function EditWorkoutForm({ workoutPlanName, workoutPlanId, setIsEditing }) {
  const [data, setData] = useState([]);
  const [planName, setPlanName] = useState(workoutPlanName);
  const [count, setCount] = useState(-1);
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [exerciseId, setExerciseId] = useState();
  const [exerciseArray, setExerciseArray] = useState([]);
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [day, setDay] = useState("Sunday");
  const [time, setTime] = useState();

  const [addID, setAddID] = useState(0); //used to update table with latest data after inserting
  const [editID, setEditID] = useState(0);
  const [deleteID, setDeleteID] = useState(0);
  const [updateID, setUpdateID] = useState(0);

  //update variables
  const [uexerciseId, usetExerciseId] = useState("");
  const [usets, usetSets] = useState("");
  const [ureps, usetReps] = useState("");
  const [uweight, usetWeight] = useState("");
  const [uday, usetDay] = useState("");
  const [utime, usetTime] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);

  const url = `${config.backendUrl}/workout_plan/${workoutPlanId}?include_exercises=true`;
  //local storage functions
  const [ex_arr, setex_arr] = useState([]);
  const [add_ex_arr, setadd_ex_arr] = useState([]);
  const [up_ex_arr, setup_ex_arr] = useState([]);
  const [del_ex_arr, setdel_ex_arr] = useState([]);

  const localToData = () => {
    const newData = [];
    for (let i = 0; i < ex_arr.length; i++) {
      //console.log(ex_arr[i])
      let grab_ex = window.sessionStorage.getItem(ex_arr[i]);
      newData.push(JSON.parse(grab_ex));
      //setData([...oldArray, grab_ex])
    }
    setData(newData);
    //console.log("data", data)
  };
  function pullData(wk_e) {
    for (let i = 0; i < wk_e.length; i++) {
      let new_ex = wk_e[i];
      let id = new_ex.workout_plan_exercise_id;
      window.sessionStorage.setItem(id, JSON.stringify(new_ex));
      ex_arr[i] = Number(id);
      //console.log(window.sessionStorage.getItem(id))
    }
    localToData();
  }
  function getData() {
    fetch(url, { credentials: "include" }).then((res) => {
      res.json().then((data) => {
        //console.log("pulled", data.workout_plan.exercises)
        pullData(data.workout_plan.exercises);
      });
    });
  }

  const addData = () => {
    let fakeID = count;
    setCount(count - 1);
    const new_ex = {
      workout_plan_exercise_id: fakeID,
      workout_plan_id: workoutPlanId,
      exercise_id: exerciseId,
      weekday: day,
      time: time,
      reps_per_set: reps,
      num_sets: sets,
      weight: weight,
    };
    window.sessionStorage.setItem(fakeID, JSON.stringify(new_ex));
    add_ex_arr[add_ex_arr.length] = Number(fakeID);
    ex_arr[ex_arr.length] = Number(fakeID);
    console.log("array", ex_arr);
    localToData();
  };

  useEffect(() => {
    getData(url);
  }, [url]);

  useEffect(() => {
    window.sessionStorage.setItem("add_exercise_array", JSON.stringify(add_ex_arr));
    console.log("updating add array");
  }, [addID, add_ex_arr]);

  useEffect(() => {
    console.log("updating update array");
    window.sessionStorage.setItem("update_exercise_array", JSON.stringify(up_ex_arr));
  }, [updateID, up_ex_arr]);

  useEffect(() => {
    console.log("updating delete array");
    window.sessionStorage.setItem("delete_exercise_array", JSON.stringify(del_ex_arr));
  }, [deleteID, del_ex_arr]);

  useEffect(() => {
    window.sessionStorage.setItem("WorkoutPlanName", planName);
  }, [planName]);

  useEffect(() => {
    fetch(`${config.backendUrl}/exercises/`)
      .then((data) => data.json())
      .then((val) => setExerciseArray(val));

    console.log("exArray", exerciseArray);
  }, []);

  useEffect(() => {
    setAddID(1);
  }, [addID]);
  useEffect(() => {
    setUpdateID(1);
  }, [updateID]);
  useEffect(() => {
    setDeleteID(1);
  }, [deleteID]);

  const handleSubmit = (event) => {
    setAddID("1");
    console.log("add", addID);
    event.preventDefault();
    addData(ex_arr);
    handleShowAddButton("true");
    setDefualts();
    console.log("add-array", add_ex_arr);
    setAddID(0);
    //console.log("data", data)
  };

  const handleEdit = (id) => {
    setIsEditing(true);
    console.log(id);
    let grab_ex = window.sessionStorage.getItem(id);
    let ex = JSON.parse(grab_ex);
    usetExerciseId(getExId(ex));
    usetDay(ex.weekday);
    usetReps(ex.reps_per_set);
    usetTime(ex.time);
    usetSets(ex.num_sets);
    usetWeight(ex.weight);
    setEditID(id);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    setUpdateID(1);
    console.log("upExId", uexerciseId);
    const new_ex = {
      workout_plan_exercise_id: editID,
      workout_plan_id: workoutPlanId,
      exercise_id: uexerciseId,
      weekday: uday,
      time: utime,
      reps_per_set: ureps,
      num_sets: usets,
      weight: uweight,
    };
    if (!add_ex_arr.includes(editID) && !up_ex_arr.includes(editID)) {
      up_ex_arr[up_ex_arr.length] = Number(editID);
    }
    window.sessionStorage.setItem(editID, JSON.stringify(new_ex));
    setEditID(0);
    localToData();
    setUpdateID(0);
  };

  const deleteFromArray = (id, flag) => {
    //search arrays for a specific value, delete value, update array
    let temp_arr = ex_arr;
    if (flag === "add_ex") {
      temp_arr = add_ex_arr;
      const index = temp_arr.indexOf(id);
      temp_arr.splice(index, 1);
      setadd_ex_arr(temp_arr);
    } else if (flag === "up_ex") {
      temp_arr = up_ex_arr;
      const index = temp_arr.indexOf(id);
      temp_arr.splice(index, 1);
      setup_ex_arr(temp_arr);
    } else {
      const index = temp_arr.indexOf(id);
      console.log("idx", index);
      temp_arr.splice(index, 1);
      setex_arr(temp_arr);
    }
    console.log("ex_arr", ex_arr);
  };
  const handleDelete = (id) => {
    setDeleteID(Number(id));
    console.log("in, delete ID=", id);
    if (ex_arr.length === 1) {
      //handle last value in exercise array
      var temp_clear = ex_arr;
      temp_clear.pop();
      setex_arr(temp_clear);
      if (!add_ex_arr.includes(Number(id))) {
        del_ex_arr[del_ex_arr.length] = Number(id);
        console.log("Delete Array", del_ex_arr);
      }
      if (add_ex_arr.includes(Number(id))) {
        deleteFromArray(Number(id), "add_ex");
      }
    }
    if (ex_arr.includes(Number(id)) && !add_ex_arr.includes(Number(id))) {
      //exercise pulled from the database
      deleteFromArray(Number(id), "");
      del_ex_arr[del_ex_arr.length] = Number(id);
      console.log("Delete Array", del_ex_arr);
    } else if (add_ex_arr.includes(Number(id))) {
      //exercise was recently added, did not make it to the database
      deleteFromArray(Number(id), "add_ex");
      deleteFromArray(Number(id), "");
      setAddID(id);
    }
    if (up_ex_arr.includes(Number(id))) {
      // exercise was recently updated
      deleteFromArray(Number(id), "up_ex");
      setUpdateID(id);
      console.log("Update Array", up_ex_arr);
    }
    localToData();
    setDeleteID(0);
  };

  const handleShowForm = (event) => {
    console.log("showForm =", event);
    if (event === "false") {
      setShowForm(false);
      setIsEditing(false);
    } else {
      setShowForm(true);
      setIsEditing(true);
      handleShowAddButton("false");
    }
  };

  const handleShowAddButton = (event) => {
    setIsEditing(true);
    console.log("showAddButton =", event);
    if (event === "false") {
      setShowAddButton(false);
    } else {
      setShowAddButton(true);
      handleShowForm("false");
    }
  };

  const setDefualts = () => {
    setExerciseId(0);
    setSets("");
    setReps("");
    setWeight("");
    setTime("");
    setDay("Sunday");
  };

  const handleCancel = () => {
    setIsEditing(false);
    handleShowAddButton("true");
    setDefualts();
  };

  function exName(id) {
    let idx = Number(id);
    //console.log("exer", exerciseArray)
    if (exerciseArray.length > 0) {
      let result = exerciseArray.at(idx - 1).name;
      return result;
    }
  }

  function capitalize(txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  }

  function getExId(obj) {
    //handles sub-object "exercise" in workout_plan_exercise objects fetched
    if (obj.exercise) {
      return obj.exercise.exercise_id;
    } else {
      return obj.exercise_id;
    }
  }

  return (
    <div className="container">
      <Row>
        <Col md={5}>
          <Form.Group>
            <Form.Label>
              <b>Workout Plan Name</b>
            </Form.Label>
            <Form.Control type="text" value={planName} onChange={(e) => setPlanName(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>

      <Table responsive hover>
        <thead>
          <tr>
            <th>Action</th>
            <th>Exercise</th>
            <th>Set Number</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Weekday</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((workout_exercise, index) =>
            workout_exercise.workout_plan_exercise_id === editID ? (
              <tr>
                <td>
                  <Button className="w-100" variant="success" onClick={handleUpdate}>
                    Update
                  </Button>
                </td>
                <td>
                  <Form.Group>
                    <Form.Select name="upexercise" onChange={(e) => usetExerciseId(e.target.value)}>
                      <option value={uexerciseId}>{exName(Number(uexerciseId))}</option>
                      {exerciseArray.map((opts, i) => (
                        <option key={opts.exercise_id} value={opts.exercise_id}>
                          {opts.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </td>
                <td>
                  <Form.Group>
                    <Form.Control type="number" value={usets === null ? "" : usets} onChange={(e) => usetSets(e.target.value)} />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group>
                    <Form.Control type="number" value={ureps === null ? "" : ureps} onChange={(e) => usetReps(e.target.value)} />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group>
                    <Form.Control type="number" value={uweight === null ? "" : uweight} onChange={(e) => usetWeight(e.target.value)} />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group>
                    <Form.Select name="upday" onChange={(e) => usetDay(e.target.value)}>
                      {weekDays.map((day, index) => (
                        <option key={index} value={day} selected={day === capitalize(uday)}>
                          {day}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </td>
                <td>
                  <Form.Group>
                    <Form.Control type="time" value={utime} onChange={(e) => usetTime(e.target.value)} />
                  </Form.Group>
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td md={1}>
                  <ButtonGroup>
                    <Button variant="primary" onClick={() => handleEdit(workout_exercise.workout_plan_exercise_id)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(workout_exercise.workout_plan_exercise_id)}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
                <td>{exName(getExId(workout_exercise))}</td>
                <td>{workout_exercise.num_sets}</td>
                <td>{workout_exercise.reps_per_set}</td>
                <td>{workout_exercise.weight}</td>
                <td>{capitalize(workout_exercise.weekday)}</td>
                <td>{workout_exercise.time}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>

      <div>
        {showForm && (
          <Form onSubmit={handleSubmit}>
            <Table responsive>
              <tbody>
                <tr>
                  <td>
                    <ButtonGroup>
                      <Button variant="success" type="submit">
                        Add
                      </Button>
                      <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </ButtonGroup>
                  </td>
                  <td>
                    <Form.Group>
                      <Form.Select name="upexercise" onChange={(e) => setExerciseId(e.target.value)} required>
                        {exerciseArray.map((opts, i) => (
                          <option key={i} value={opts.exercise_id}>
                            {opts.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group>
                      <Form.Control type="number" placeholder="Sets" onChange={(e) => setSets(e.target.value)} />
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group>
                      <Form.Control type="number" placeholder="Reps" onChange={(e) => setReps(e.target.value)} />
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group>
                      <Form.Control type="text" placeholder="Weight" onChange={(e) => setWeight(e.target.value)} />
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group>
                      <Form.Select name="day" onChange={(e) => setDay(e.target.value)} required>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                      </Form.Select>
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group>
                      <Form.Control type="time" onChange={(e) => setTime(e.target.value)} defaultValue={'12:00:00'} required />
                    </Form.Group>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form>
        )}
      </div>
      {showAddButton && (
        <div className="d-grid gap-2">
          <Button variant="outline-dark" size="lg" id="add" value="true" onClick={(e) => handleShowForm(e.target.value)}>
            +
          </Button>
        </div>
      )}
    </div>
  );
}

export default EditWorkoutForm;
