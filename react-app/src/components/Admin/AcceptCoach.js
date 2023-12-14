import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { config } from '../../utils/config';

function AcceptCoach({user_id, handleUploadSuccessChange}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAcceptCoach = () => {
        try{
            const response = fetch(`${config.backendUrl}/get_coach_dashboard_info/coach_request/${user_id}`, {
                method: "PUT",
                headers: {
                // Moved data to body instead of headers
                "Content-Type": "application/json",
                },
                credentials: "include", // Include credentials with the request
            });
            // if (!response.ok) {
            //     throw new Error(`Failed to accept coach. Status: ${response.status}`);
            // }

            handleUploadSuccessChange(true);
            handleClose();
        } catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <button onClick={handleShow} className="btn btn-success m-2">
                Accept
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
                Are you sure you want to accept coach?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <button onClick={handleAcceptCoach}>Yes</button>
                <button onClick={handleClose}>Cancel</button>
            </Modal.Body>
            </Modal>
        </>
    );
}

export default AcceptCoach;