import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'

function RejectCoach({user_id, handleUploadSuccessChange}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRejectCoach = () => {
        try{
            const response = fetch(`http://localhost:3500/get_coach_dashboard_info/coach_request/${user_id}`, {
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

            handleUploadSuccessChange(true);
            handleClose();
        } catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <button onClick={handleShow} className="btn btn-danger m-2">
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
                Are you sure you want to reject coach?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <button onClick={handleRejectCoach}>Yes</button>
                <button onClick={handleClose}>Cancel</button>
            </Modal.Body>
            </Modal>
        </>
    );
}

export default RejectCoach;