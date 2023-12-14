import React from 'react'
import { useState, useEffect } from 'react';
import { Modal, Table, Form, Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { config } from "./../../utils/config";
import "../../css/ActivityLogger.css"
import { useAuth } from '../../hooks/useAuth';

function WorkoutProgress({workoutPlanName, workoutPlanId, handleUploadSuccessChange, show, handleClose}) {
    
    const [exercises, setExercises] = useState([]);
    const [exercise, setExercise] = useState();
    const [count, setCount] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [reps, setReps] = useState();
    const [weight, setWeight] = useState();
    const [setArray, setSetArray] = useState([]);

    const [showAddButton, setShowAddButton] = useState(true);

    const {user} = useAuth();

    const url = `${config.backendUrl}/workout_plan/${workoutPlanId}?include_exercises=true`;

    useEffect (()=> {
      getData();
      console.log("add", showAddButton)
  },[showAddButton,show])

    function getDate() {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = today.getDate();
      return `${year}-${month}-${date}`;
    }

    function getDayOfWeek() {
      const today = new Date();
      var days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
      var day = days[ today.getDay() ];
      return day;
    }

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
        } else if (hours === 0) {
          timeValue = "12";
        }
      
        timeValue += mins < 10 ? ":0" + mins : ":" + mins;
        // timeValue += (sec < 10) ? ":0" + sec : ":" + sec;
        timeValue += hours >= 12 ? " P.M." : " A.M.";
      
        // show
        return timeValue;
      };

    const getData = async ()=> {
        fetch(url, { credentials: "include" }).then((res) => {
          res.json().then((data) => {
            const pulled = data.workout_plan.exercises;
            const incoming = [];
            pulled.forEach((element)=> {if(element.weekday == getDayOfWeek()){incoming[incoming.length]=element}})
            setExercises(incoming)
            if (!res.ok){throw new Error("Network response was not ok");}
          });
        });
        if (exercises.length === 0){setIsEditing(true)}
        setExercise(exercises[0])
      }

      const addToDB = async (s) => {
        console.log("before transit", exercise)
        try{
            const data = {
                user_id : user.user_id,
                workout_exercise_id : exercise.workout_plan_exercise_id,
                set_number : s[0],
                reps : Number.isInteger(s[1]) ? s[1] : 0,
                weight : Number.isInteger(s[2]) ? s[2] : 0,
                date : getDate()
            }
            console.log("in transit (add)", data);
            const response = await fetch(`${config.backendUrl}/workout_progress/new`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include", 
            });
            console.log(response);
    
            if (!response.ok) {
                throw new Error(`Failed to add workout progress. Status: ${response.status}`);
            }
    
        } catch(err){
            console.log(err);
        }
    }

    function capitalize(txt) {
        return txt.charAt(0).toUpperCase() + txt.slice(1);
      }

      const handleShowForm = (event) => {
        console.log("showForm =", event);
        if (event === "false") {
          setShowForm(false);
          setIsEditing(false);
          setShowAddButton(true)
        } else {
          setShowForm(true);
          setIsEditing(true);
          setShowAddButton(false);
        }
      };

      const handleCancel = () =>{
        handleShowForm("false");
      }

      const handleAdd = () =>{
        let tReps = reps;
        let tWeight = weight;
        if(!tReps){tReps=""} else{tReps = Number(tReps)};
        if(!tWeight){tWeight=""} else{tWeight = Number(tWeight)};
        const addSet = [count, tReps, tWeight];

            console.log("addSet", addSet);
            setArray[setArray.length] = addSet;
            handleShowForm("false");
            setCount(count +1);
            setReps();
            setWeight();
      }

      const handleHide = () =>{
        setSetArray([]);
        setCount(1);
        handleClose();
      }

      const handleSubmit = () =>{
        setArray.forEach((element)=> addToDB(element));
        handleHide();
      }
      

  return (
    <div>
      <Modal
      //size="lg"
      contentClassName="custom-modal-style"
      show={show}
      onHide={handleHide}
      backdrop="static"
      centered
      >
        <Modal.Header closeButton>
            <Modal.Title>Activity Logger - {workoutPlanName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {exercises.length === 0 ? (
            <div className="container d-flex justify-content-center align-items-center my-2">
                <div className="w-50 d-flex flex-column justify-content-center align-items-center border border-black shadow rounded p-2 my-2">
                    <h6> No Exercises Scheduled for Today</h6>
                    <small>Create an Exercise by Clicking on the Edit Button.</small>
                </div>
            </div>
            ) :
            <Container>
                <Row>
                    Exercise:<br/>
                </Row>
                <Row>
                    <Col xs={.5}></Col>
                    <Col xs={7.5} md={9}>
            <Form.Group>
                <Form.Select onChange={(e) => setExercise(e.target.value)}>
         {exercises.map((wpe, i) => (
            <option key={wpe.workout_plan_exercise_id} value={wpe.workout_plan_exercise_id}>{wpe.exercise.name}, {capitalize(wpe.weekday)} at {convertTimeAMPM(wpe.time)}&nbsp;&nbsp;{wpe.num_sets && wpe.reps_per_set ? "("+ wpe.num_sets + "x" + wpe.reps_per_set + ")" : ""}</option>
         ))}
         </Form.Select>
         </Form.Group>
         </Col>
         <Col xs={4}></Col>
         </Row>
         <Table responsive>
            <thead>
                <tr>
                <th>Set Number</th>
                <th>Reps</th>
                <th>Weight</th>
                </tr>
            </thead>
            <tbody>
                {setArray.map((set, index) => (
                    <tr key={index}>
                        <td>{set[0]}</td>
                        <td>{set[1]}</td>
                        <td>{set[2]}</td>
                    </tr>
                ))}
            </tbody>
         </Table>
         <div>
        {showForm && (
          <Form>
            <Table responsive>
              <tbody>
                <tr>
                  <td>
                    <ButtonGroup>
                      <Button variant="success" onClick={handleAdd}>
                        Add
                      </Button>
                      <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </ButtonGroup>
                  </td>
                  <td>
                    <Form.Group>
                      <Form.Control type="number" placeholder={count} value={count} disabled/>
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group>
                      <Form.Control type="number" placeholder="Reps" onChange={(e) => setReps(e.target.value)}/>
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group>
                      <Form.Control type="number" placeholder="Weight" onChange={(e) => setWeight(e.target.value)} />
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
         </Container>
}
        </Modal.Body>
        <Modal.Footer>
            <Button className='w-100'  variant="dark" onClick={handleSubmit} disabled={isEditing}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default WorkoutProgress;