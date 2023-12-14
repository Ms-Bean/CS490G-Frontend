import {useState, useEffect} from 'react'
import { Button, Table, Modal, Alert } from "react-bootstrap";
import { config } from "./../utils/config";


const AcceptDenyClients = () => {
  const [show, setShow] = useState();
  const [requests, setRequests] = useState([]);
  const [activeClient, setActiveClient] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  

  const url =`${config.backendUrl}/requested_clients`

  const handleClose = () => setShow(false);
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

const confirmAccept = (request)=>{
  setActiveClient(request)
  handleShow();
}
useEffect (()=> {
  getData();
  //getProfInfo();
},[show])

  return (
    <div>
      <Alert variant="success" show={showAlert}>Hooray! You are now {activeClient.name}'s coach!</Alert>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Action</th>
            <th>User</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index)=> (
            <tr key={index}>
            <td><Button variant="success" onClick={() =>confirmAccept(request)}>Accept</Button></td>
              <td>{request.id}</td>
              <td>{request.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
            If you accept, you will be {activeClient.name}'s new Coach.
            <br/>
            <Button onClick={() =>acceptClient(activeClient.id)}>Confirm Accept</Button>
            </Modal.Body>
          </Modal>
    </div>

    
  )
}

export default AcceptDenyClients
