import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlusCircle} from "react-icons/fa";
import { useAuth } from '../../hooks/useAuth';

const NewWorkoutPlan = ({handleUploadSuccessChange}) => {

    const {user} = useAuth();
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    //In form just in case we add more values
    const [formData, setFormData] = useState(
        {
            name : ""
        }
    )

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitWorkoutPlan = async () => {
        try{
            console.log(formData.name);
            const data = {
                name : formData.name,
                author_id : user.user_id,
            }
            console.log(data);
            const response = await fetch(`http://localhost:3500/workout_plan/new`, {
                method: "POST",
                headers: {
                  // Moved data to body instead of headers
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include", // Include credentials with the request
            });
            console.log(response);
            if (!response.ok) {
                setError("Failed to Create Workout Plan")
                throw new Error(`Failed to create workout plan. Status: ${response.status}`);
            }
            setShow(false);
            handleUploadSuccessChange();
        } catch(err){
            console.log(err);
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div onClick={handleShow} className="d-inline ms-3" data-bs-toggle="modal" style={{cursor : "pointer"}}>
                <FaPlusCircle className='mb-1' size={22} style={{color : "#6CB4EE"}}/>
            </div>

            <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title>New Workout Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error ? 
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                :
                <>
                </>
                }
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label ms-1">Name</label>
                        <input onChange={handleInputChange} type="text" className="form-control" id="name" name="name" aria-describedby="name" placeholder='Name for Workout'/>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={submitWorkoutPlan} className='w-100' variant="dark">Save</Button>
            </Modal.Footer>
            </Modal>

        </>
    );
}

export default NewWorkoutPlan;