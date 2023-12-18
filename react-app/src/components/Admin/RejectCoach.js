import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { config } from '../../utils/config';

function RejectCoach({user_id, handleUploadSuccessChange, firstName}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRejectCoach = () => {
        try{
            const response = fetch(`${config.backendUrl}/get_coach_dashboard_info/coach_request/${user_id}`, {
                method: "DELETE",
                headers: {
                // Moved data to body instead of headers
                "Content-Type": "application/json",
                },
                credentials: "include", // Include credentials with the request
            });
            // if (!response.ok) {
            //     throw new Error(`Failed to accept coach. Status: ${response.status}`);
            // }

            handleUploadSuccessChange();
            handleClose();
        } catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <button onClick={handleShow} className="btn btn-danger">
                Reject
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
                Reject Coach
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <center>Are you sure you want reject coach "{firstName}"? <p/><b>This action cannot be undone.</b></center>
                <button className='btn btn-danger w-100 mt-2' onClick={handleRejectCoach}>Reject</button>
            </Modal.Body>
            </Modal>
        </>
    );
}

export default RejectCoach;