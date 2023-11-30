import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const tempExercise = [
    {
      "exercise": "Squat",
      "time": "10 AM",
      "day": "Tuesday",
      "sets": "5x5",
      "weight": "145lb"
    },
    {
      "exercise": "ОНР",
      "time": "2 PM",
      "day": "Tuesday",
      "sets": "5x5",
      "weight": "85lb"
    },
    {
      "exercise": "Deadlift",
      "time": "2 PM",
      "day": "Wednesday",
      "sets": "5x5",
      "weight": "185lb"
    },
    {
      "exercise": "BB Row",
      "time": "2 PM",
      "day": "Thursday",
      "sets": "5x5",
      "weight": "125lb"
    }
  ]

const tempGoals = [
    'Build Muscle',
    'Improve Endurance',,
    'Reduce Body Fat Percentage',
    'Improve Posture',
];

function WorkoutPlanInfo({workoutPlanName, exercises, goals}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <button onClick={handleShow} className="w-50 btn btn-secondary rounded-0">
            Info
        </button>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        >
        <Modal.Header className='text-center' closeButton>
            <Modal.Title className='w-100'>
            {workoutPlanName}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='w-75 mx-auto'>
                <small>Goals:
                    {tempGoals.map((goal, index) => (
                        <span className='ms-1' key={`goal-${index}`}>{goal},</span>
                    ))}
                </small>
            </div>
            <div className='mt-3'>
                <div className='border-bottom '>
                    <h5 className='ms-3'>Workout Plan</h5>
                </div>
                <ul class="list-group">
                    {tempExercise.map((e, index) => (
                         <li class="list-group-item border-0 border-bottom d-flex">
                            <div className='me-auto'>
                                {e.exercise}
                            </div>
                            <div>
                                {e.time} {e.day} {e.sets} {e.weight}
                            </div>
                         </li>
                    ))}
                </ul>
            </div>
        </Modal.Body>
        </Modal>
    </>
  );
}

export default WorkoutPlanInfo;