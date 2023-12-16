import {useState, useEffect} from 'react'
import { Button, Table, Modal, Alert, ButtonGroup } from "react-bootstrap";
import { config } from "./../utils/config";


const AcceptDenyClients = ({handleUploadSuccessChange}) => {
  const [show, setShow] = useState();
  const [requests, setRequests] = useState([]);
  const [activeClient, setActiveClient] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [decline, setDecline] = useState(false);
  

  const url =`${config.backendUrl}/requested_clients`

  const handleClose = () => {
    handleUploadSuccessChange();
    setShow(false);}

  const handleCloseDecline = () => setShow(false);
  const handleShow = () => setShow(true);

const getData = async ()=> {
  fetch(url, { credentials: "include" }).then((res) => {
    res.json().then((data) => {
      console.log(data.requested_clients);
      setRequests(data.requested_clients);
      if (!res.ok){throw new Error("Network response was not ok");}
    });
  });
}

const getProfInfo = async (id) => {
    fetch(`${config.backendUrl}/get_profile_info/?user_id=${id}`, { credentials: "include" }).then((res) => {
      res.json().then((data) => {
        console.log(data)
        if (!res.ok){throw new Error("Network response was not ok");}
      });
    });
  }

const acceptClient = async (id) =>{
  try{
    const data = {
      client_id : Number(id)
    }
    console.log(data);
    const response = await fetch(`${config.backendUrl}/accept_client`,{
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to accept client. Status: ${response.status}`)
    }
    else{
      setShowAlert(true);
    }
  } catch (err){
    console.log(err);
  }
  handleClose();
}

const declineClient = async (id) =>{
  try{
    const data = {
      client_id : Number(id)
    }
    console.log(data);
    const response = await fetch(`${config.backendUrl}/reject_client`,{
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to reject client. Status: ${response.status}`)
    }
    else{
      setShowAlert2(true);
    }
  } catch (err){
    console.log(err);
  }
  handleCloseDecline();
}

const confirmAccept = (request)=>{
  setActiveClient(request);
  setDecline(false);
  handleShow();
}

const confirmDecline = (request)=>{
  setActiveClient(request);
  setDecline(true);
  handleShow();
}
useEffect (()=> {
  getData();
  //getProfInfo();
},[show])

  return (
    <div>
      
      <Alert variant="success" show={showAlert}>Hooray! You are now {activeClient.name}'s coach!</Alert>
      <Alert variant="success" show={showAlert2}>You have declined {activeClient.name}'s request.</Alert>
      {requests.length === 0 ? (
            <div className="container d-flex justify-content-center align-items-center my-2">
                <div className="w-50 d-flex flex-column justify-content-center align-items-center border border-black shadow rounded p-2 my-2">
                    <h6> No Requests </h6>
                    <small>You have no pending client requests.</small>
                </div>
            </div>
            ) :
      <Table responsive hover>
        <thead>
          <tr>
            <th>Action</th>
            <th>Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index)=> (
            <tr key={index}>
            <td><ButtonGroup>
              <Button variant="success" onClick={() =>confirmAccept(request)}>Accept</Button>
              <Button variant="danger" onClick={() =>confirmDecline(request)}>Decline</Button>
              </ButtonGroup>
              </td>
              <td align="left" style={{ verticalAlign: "middle" }}>{request.name}</td>
              <td align="left" style={{ verticalAlign: "middle" }}>{request.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>}
      <Modal
        size="sm"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered>
        <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            {
            decline ? (
            <div>
            <p>Decline {activeClient.name}'s coach request?</p>
            <br/>
            <Button variant="danger" onClick={() =>declineClient(activeClient.id)}>Confirm Decline</Button>
            </div>
            ):(
              <div>
              If you accept, you will be {activeClient.name}'s new Coach.
            <br/>
            <Button variant="success" onClick={() =>acceptClient(activeClient.id)}>Confirm Accept</Button>
            </div>)}
            </Modal.Body>
          </Modal>
    </div>

    
  )
}

export default AcceptDenyClients
