import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'


// const convertTimeAMPM = (time) => {
//     const t = time.split(":");

//     const hours = Number(t[0]);
//     const mins = Number(t[1]);
//     const sec = Number(t[2]);

//     // calculate
//     let timeValue;

//     if (hours > 0 && hours <= 12) {
//     timeValue= "" + hours;
//     } else if (hours > 12) {
//     timeValue= "" + (hours - 12);
//     } else if (hours == 0) {
//     timeValue= "12";
//     }

//     timeValue += (mins < 10) ? ":0" + mins : ":" + mins;  
//     // timeValue += (sec < 10) ? ":0" + sec : ":" + sec; 
//     timeValue += (hours >= 12) ? " P.M." : " A.M."; 

//     // show
//     return timeValue;
// }

function CoachInfo({coach}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button onClick={handleShow} className="btn btn-secondary m-2">
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
                Coach Request
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <li>First Name: {coach.firstName}</li>
                    <li>Last Name: {coach.lastName}</li>
                    <li>Phone Number : {coach.phoneNumber}</li>
                    <li>Email : {coach.email}</li>
                    <li>Experience : {coach.experienceLevel}</li>
                    <li>Hourly Rate : {coach.hourlyRate}</li>
                    <li>Coach History : {coach.coachingHistory}</li>
                    <li>Availability : {coach.availability}</li>
                </ul>
            </Modal.Body>
            </Modal>
        </>
    );
}

export default CoachInfo;