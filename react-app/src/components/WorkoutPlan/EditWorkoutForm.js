import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ButtonGroup, Table } from 'react-bootstrap';

function EditWorkoutForm() {
    const [data, setData] = useState([])

    const [exercise, setExercise] = useState('Plank') //hard coded Plank for now, will be first exercise from bank in DB
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [day, setDay] = useState('Sunday')
    const [time, setTime] = useState()

    const [addID, setAddID] = useState(0) //used to update table with latest data after inserting
    const [editID, setEditID] = useState(-1)
    const [deleteID, setDeleteID] = useState()

    //update variables
    const[uexercise, usetExercise] = useState('')
    const[usets, usetSets] = useState('')
    const[ureps, usetReps] = useState('')
    const[uweight, usetWeight] = useState('')
    const[uday, usetDay] = useState('')
    const[utime, usetTime] = useState('')

    const[showForm, setShowForm] = useState(false)
    const[showAddButton, setShowAddButton] = useState(true)
    
    useEffect(()=>{
        axios.get('http://localhost:3600/workout_exercises') //use axios & temp db for now
        .then(res => {
            setData(res.data)
            console.log(res)
        })
        .catch(er => {
            console.log(er)});
    }, [editID, deleteID, addID])

    const handleSubmit=(event) => {
        setAddID(1)
        event.preventDefault();
        axios.post('http://localhost:3600/workout_exercises', {exercise: exercise, num_sets: sets, reps_per_set: reps, weight: weight, weekday: day, time: time})
        .then(res => {
            console.log(res)
            setAddID(0)
            handleShowAddButton("true")
            setDefualts()
        })
        .catch(er => console.log(er));
    }

    const handleEdit=(id) => {
        axios.get('http://localhost:3600/workout_exercises/'+id)
        .then(res => {
            usetExercise(res.data.exercise)
            usetSets(res.data.num_sets)
            usetReps(res.data.reps_per_set)
            usetWeight(res.data.weight)
            usetDay(res.data.weekday)
            usetTime(res.data.time)
            console.log(res)
        })
        .catch(er => {
            console.log(er)});
        setEditID(id)
    }

    const handleUpdate=() => {
        axios.put('http://localhost:3600/workout_exercises/'+editID, {id:editID, exercise: uexercise, num_sets: usets, reps_per_set: ureps, weight: uweight, weekday: uday, time: utime})
        .then(res=>{
            console.log(res)
            setEditID(-1)
        })
        .catch(er=> console.log(er))
    }

    const handleDelete=(id) =>{
        setDeleteID(id)
        axios.delete('http://localhost:3600/workout_exercises/'+id)
        .then(res=>{
            console.log(res)
            setDeleteID(-1)
        })
        .catch(er=> console.log(er))
    }

    const handleShowForm=(event) =>{
        console.log('showForm =', event)
        if (event === "false"){
        setShowForm(false)}
        else {
        setShowForm(true)
        handleShowAddButton("false")}
    }

    const handleShowAddButton=(event) =>{
        console.log('showAddButton =', event)
        if(event === "false"){
        setShowAddButton(false)}
        else {
        setShowAddButton(true)
        handleShowForm("false")}
    }

    const setDefualts=() =>{
        setExercise('Plank')
        setSets('')
        setReps('')
        setWeight('')
        setTime('')
        setDay('Sunday')
    }

    const handleCancel=() =>{
        handleShowAddButton("true")
        setDefualts()
    }
    
  return (
    <div className='container'>
      <Table hover>
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
            {
                data.map((workout_exercise, index) => (
                    workout_exercise.id === editID ?
                    <tr> 
                        <td></td>
                        <td>
                            <select name="upexercise" onChange={e => usetExercise(e.target.value)}>
                                <option value={uexercise}>{uexercise}</option>
                                <option value="Plank">Plank</option>
                                <option value="Bench Press">Bench Press</option>
                                <option value="Jogging">Jogging</option>
                                <option value="Sprinting">Sprinting</option>
                            </select>
                        </td>
                        <td><input type="number" size="5" value={usets} onChange={e => usetSets(e.target.value)}/></td>
                        <td><input type="number" size="5" value={ureps} onChange={e => usetReps(e.target.value)}/></td>
                        <td><input type="number" size="5" value={uweight} onChange={e => usetWeight(e.target.value)}/></td>
                        <td>
                            <select name="upday" onChange={e => usetDay(e.target.value)}>
                                <option value={uday}>{uday}</option>
                                <option value="Sunday">Sunday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                            </select>
                        </td>
                        <td><input type="time" size="7" value={utime} onChange={e => usetTime(e.target.value)}/></td>
                        <td><Button variant="success" onClick={handleUpdate}>Update</Button></td>
                    </tr>
                    :
                    <tr key={index}>
                        <td>
                        <ButtonGroup>
                            <Button variant="primary" onClick={() => handleEdit(workout_exercise.id)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDelete(workout_exercise.id)}>Delete</Button>
                        </ButtonGroup>
                        </td>
                        <td>{workout_exercise.exercise}</td>
                        <td>{workout_exercise.num_sets}</td>
                        <td>{workout_exercise.reps_per_set}</td>
                        <td>{workout_exercise.weight}</td>
                        <td>{workout_exercise.weekday}</td>
                        <td>{workout_exercise.time}</td>
                    </tr>
                ))
            }
        </tbody>
      </Table>
      <div>
        {showForm && (
      <form onSubmit={handleSubmit}>
        <select name="exercise" onChange={e => setExercise(e.target.value)} required>
            <option value="Plank">Plank</option>
            <option value="Bench Press">Bench Press</option>
            <option value="Jogging">Jogging</option>
            <option value="Sprinting">Sprinting</option>
        </select>
        <input type="number" size="5" placeholder="Sets" onChange={e => setSets(e.target.value)}/>
        <input type="number" size="5" placeholder="Reps" onChange={e => setReps(e.target.value)}/>
        <input type="text" size="7" placeholder="Weight" onChange={e => setWeight(e.target.value)}/>
        <label>&nbsp;Day:&nbsp;</label><select name="day" onChange={e => setDay(e.target.value)} required>
            <option value="Sunday">Sunday</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
        </select>
        <label>&nbsp;Time:&nbsp;</label><input type="time" size="7" placeholder="Time" onChange={e => setTime(e.target.value)}/>
        <ButtonGroup>
            <Button variant="success" type="submit">Add</Button>
            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        </ButtonGroup>
        </form>
        )}
      </div>
      {showAddButton && (<div className="d-grid gap-2"> <Button variant="outline-dark" size="lg" id='add' value="true" onClick={(e => handleShowForm(e.target.value))}>+</Button> </div>)}
        
    </div>
      
  )
}

export default EditWorkoutForm
