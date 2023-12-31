import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { config } from '../../utils/config';


function AcceptCoach({ user_id, handleUploadSuccessChange, firstName }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAcceptCoach = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/get_coach_dashboard_info/coach_request/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

    //   if (!response.ok) {
    //     throw new Error(`Failed to accept coach. Status: ${response.status}`);
    //   }

      handleUploadSuccessChange();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="btn btn-success">
        Accept
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header className="text-center" closeButton>
          <Modal.Title className="w-100">Accept Coach</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            Are you sure you want accept coach "{firstName}"? <p />
            <b>This action cannot be undone.</b>
          </center>
          <button className="btn btn-success w-100 mt-2" onClick={handleAcceptCoach}>
            Accept
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AcceptCoach;
