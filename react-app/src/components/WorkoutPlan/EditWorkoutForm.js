import { useState, useEffect } from 'react';
import axios from 'axios';

function EditWorkoutForm() {
    const [data, setData] = useState([])

    const [exercise, setExercise] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [day, setDay] = useState('')
    const [time, setTime] = useState('')

    const [addID, setAddID] = useState(0)
    const [editID, setEditID] = useState(-1)
    const [deleteID, setDeleteID] = useState()

    //update variables
    const[uexercise, usetExercise] = useState('')
    const[usets, usetSets] = useState('')
    const[ureps, usetReps] = useState('')
    const[uweight, usetWeight] = useState('')
    const[uday, usetDay] = useState('')
    const[utime, usetTime] = useState('')
    
    useEffect(()=>{
        axios.get('http://localhost:3600/workout_exercises') //use axios & temp db for now
        .then(res => {
            setData(res.data)
            console.log(res)
        })
        .catch(er => {
            console.log(er)});
    }, [exercise, sets, reps, weight, day, time, editID, deleteID, addID])

    const handleSubmit=(event) => {
        setAddID(1)
        event.preventDefault();
        axios.post('http://localhost:3600/workout_exercises', {exercise: exercise, num_sets: sets, reps_per_set: reps, weight: weight, weekday: day, time: time})
        .then(res => {
            console.log(res)
            setAddID(0)
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
  return (
    <div className='container'>
      <table>
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
                            <select name="exercise" onChange={e => usetExercise(e.target.value)}>
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
                        <td><input type="text" size="7" value={uday} onChange={e => usetDay(e.target.value)}/></td>
                        <td><input type="text" size="7" value={utime} onChange={e => usetTime(e.target.value)}/></td>
                        <td><button onClick={handleUpdate}>Update</button></td>
                    </tr>
                    :
                    <tr key={index}>
                        <td>
                            <button onClick={() => handleEdit(workout_exercise.id)}>Edit</button>
                            <button onClick={() => handleDelete(workout_exercise.id)}>Delete</button>
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
      </table>
      <form onSubmit={handleSubmit}>
        <select name="exercise" onChange={e => setExercise(e.target.value)}>
            <option value="Plank">Plank</option>
            <option value="Bench Press">Bench Press</option>
            <option value="Jogging">Jogging</option>
            <option value="Sprinting">Sprinting</option>
        </select>
        <input type="number" size="5" placeholder="Sets" onChange={e => setSets(e.target.value)}/>
        <input type="number" size="5" placeholder="Reps" onChange={e => setReps(e.target.value)}/>
        <input type="text" size="7" placeholder="Weight" onChange={e => setWeight(e.target.value)}/>
        <input type="text" size="7" placeholder="Weekday" onChange={e => setDay(e.target.value)}/>
        <input type="text" size="7" placeholder="Time" onChange={e => setTime(e.target.value)}/>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default EditWorkoutForm
