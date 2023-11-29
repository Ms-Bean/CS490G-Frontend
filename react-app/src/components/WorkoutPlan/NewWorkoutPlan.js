import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlusCircle} from "react-icons/fa";
import TagInputs from '../TagInputs';

const exerciseBank = [
    'Squats',
    'Push-ups',
    'Lunges',
    'Deadlifts',
    'Plank',
    'Burpees',
    'Pull-ups',
    'Mountain Climbers',
    'Bench Press',
    'Russian Twists',
    'Box Jumps',
    'Dumbbell Rows',
    'Leg Press',
    'Plank Jacks',
    'Tricep Dips',
    'Jumping Lunges',
    'Hammer Curls',
    'Side Plank',
    'Wall Sits',
    'Calf Raises',
    'Battle Ropes',
    'Kettlebell Swings',
    'High Knees',
    'Bicycle Crunches',
    'Jump Rope',
    'Reverse Crunches',
    'Dumbbell Lunges',
    'Inverted Rows',
    'Romanian Deadlifts',
    'Medicine Ball Slams',
    'Dumbbell Bench Press',
    'Skater Lunges',
    'Dumbbell Shoulder Press',
    'Flutter Kicks',
    'Single-Leg Romanian Deadlifts',
    'Tuck Jumps',
    'Seated Leg Press',
    'Chin-ups',
    'Walking Lunges',
    'Side Lunges',
    'Russian Deadlifts',
    'Reverse Lunges',
    'Bent-over Rows',
    'Jumping Jacks',
    'Lat Pulldowns',
    'Standing Calf Raises',
    'Hollow Body Hold'
];

const fitnessGoalsBank = [
    'Lose Weight',
    'Build Muscle',
    'Improve Endurance',
    'Increase Flexibility',
    'Enhance Core Strength',
    'Improve Cardiovascular Health',
    'Achieve a Healthy BMI',
    'Enhance Athletic Performance',
    'Reduce Body Fat Percentage',
    'Improve Posture',
    'Increase Energy Levels',
    'Enhance Mental Well-being',
    'Improve Balance and Coordination',
    'Develop a Consistent Exercise Routine',
    'Improve Joint Health',
    'Enhance Functional Fitness',
    'Master a New Sport or Physical Activity',
    'Achieve Specific Strength Goals (e.g., Bench Press, Squat)',
    'Train for a Fitness Event (e.g., 5K, Marathon, Triathlon)',
    'Increase Flexibility Through Yoga or Stretching',
    'Improve Body Composition',
    'Build Definition and Tone',
    'Reduce Stress Levels Through Exercise',
    'Improve Sleep Quality',
    'Enhance Overall Health and Wellness',
    'Boost Metabolism',
    'Maintain Healthy Blood Pressure',
    'Improve Digestive Health Through Exercise',
    'Build a Positive Body Image',
    'Promote Longevity and Aging Well',
    'Enhance Immune System Function',
    'Achieve a Balanced and Healthy Lifestyle'
];

function NewWorkoutPlan() {

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(
    {
        name : "",
        exercises : [],
        fitnes_goals : [],
        thumbnail : ""
    }
  )
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    //fetch users workout plans

    //also fetch exercise bank and fitness goal bank

  }, [uploadSuccess]);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <div onClick={handleShow} className="d-inline ms-3" data-bs-toggle="modal" style={{cursor : "pointer"}}>
            <FaPlusCircle size={22} style={{color : "#6CB4EE"}}/>
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
            <div className='w-100'>
                <form>
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" aria-describedby="name" placeholder='Name for Workout'/>
                    </div>
                    <div class="mb-3">
                        <label for="exercises" class="form-label">Exercises</label>
                        <TagInputs placeholder="Type a Workout" workBank={exerciseBank}/>
                    </div>
                    <div class="mb-3">
                        <label for="fitness_goals" class="form-label">Fitness Goals</label>
                        <TagInputs placeholder="Type a Fitness Goal" workBank={fitnessGoalsBank}/>
                    </div>
                    <div class="mb-3">
                        <label for="thumbnail" class="form-label">Thumbnail</label>
                        <input type="file" class="form-control" id="thumbnail" aria-describedby="thumbnail"/>
                    </div>
                </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button className='w-100' variant="dark">Save</Button>
        </Modal.Footer>
        </Modal>
    </>
  );
}

export default NewWorkoutPlan;