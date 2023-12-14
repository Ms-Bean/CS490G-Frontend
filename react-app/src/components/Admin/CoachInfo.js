import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'


const formatDateToYYYYMMDD = (inputDate) => {
    const date = new Date(inputDate);
    
    // Get the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    // Format the date as "yyyy-mm-dd"
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }

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
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item lead'>First Name: {coach.firstName}</li>
                    <li className='list-group-item lead'>Last Name: {coach.lastName}</li>
                    <li className='list-group-item lead'>Phone Number : {coach.phoneNumber}</li>
                    <li className='list-group-item lead'>Email : {coach.email}</li>
                    <li className='list-group-item lead'>Experience : {coach.experienceLevel}</li>
                    <li className='list-group-item lead'>Hourly Rate : {coach.hourlyRate}</li>
                    <li className='list-group-item lead'>Coach History : {coach.coachingHistory}</li>
                    <li className='list-group-item lead'>Availability : {coach.availability}</li>
                    <li className='list-group-item lead'>Coach Request Date : {formatDateToYYYYMMDD(coach.date)}</li>
                </ul>
            </Modal.Body>
            </Modal>
        </>
    );
}

export default CoachInfo;