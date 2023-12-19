import { useState, useEffect } from 'react';
import {Modal, Button, Container, Row, Col, Tooltip, OverlayTrigger, Alert} from 'react-bootstrap';
import profile_pic from "../static_images/default-avatar-profile-icon-of-social-media-user-vector.jpg";
import "../../css/ViewCoachProf.css"
import { useAuth } from '../../hooks/useAuth';
import { config } from "./../../utils/config";

function ViewCoachProfile({ coach, handleUploadSuccessChange, handleAlert }) {
    const [show, setShow] = useState(false);
    const [showHired, setShowHired] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');
    const [hired, setHired] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [showTerm, setShowTerm] = useState(false);

    const handleClose = () => {setShow(false); setShowHired(false); setShowTerm(false);}
    const handleShow = () => {
        checkIfHired();
        if(hired){
            //console.log(coach.personal_info.first_name, coach.personal_info.last_name, "is this user's coach.");
            setShowHired(true);
        }
        else{
        setShow(true);
        }
    }
    const handleShowTerm = () => setShowTerm(true);
    const handleCloseTerm = () => setShowTerm(false);

    const url = `${config.backendUrl}/request_coach`

    const {user} = useAuth();

    const data = {
        coach_id : coach.coach_id,
        client_id : user.user_id
    }

      const reqCoach = async () => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include", 
            });
    
            if (!response.ok) {
                if (!response.bodyUsed) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Unknown error occurred');
                } else {
                    throw new Error('Error response already read');
                }
            } else {
                setAlertMessage("Your trainer request has been sent.");
                setAlertVariant('success');
                setShowAlert(true);
            }
    
        } catch(err) {
            console.log(err);
            setAlertMessage(err.message + " (Note: You may only have one active coach or coach request at a time.)");
            setAlertVariant('danger');
            setShowAlert(true);
        }
    }
   useEffect(() =>{
    checkIfHired();
   },[show, showTerm]) 

    const checkIfHired = async ()=> {
        fetch(`${config.backendUrl}/has_hired_coach/${coach.coach_id}`, { credentials: "include" }).then((res) => {
          res.json().then((data) => {
            if (!res.ok){throw new Error("Network response was not ok");}
            else{
                //console.log("Hired=", data);
                setHired(data.result);
            }
          });
        });
      }

      const terminateCoach = async () => {
        try{
          const response = await fetch(`${config.backendUrl}/terminate/${coach.coach_id}`, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
          });
          console.log(response);
          if (!response.ok) {
            handleAlert(`Failed to ended training with ${coach.personal_info.first_name} ${coach.personal_info.last_name}. Please try again later.`, "danger");
            handleCloseTerm();
            throw new Error("Network response was not ok");
          }
          else{
            handleAlert(`You ended training with ${coach.personal_info.first_name} ${coach.personal_info.last_name}.`, "success");
            handleUploadSuccessChange();
            handleCloseTerm();
          }
        }
        catch(err){
          console.log(err);
        }
    }

    const handleRequest=()=>{
        reqCoach();
    }

  return (
    <div>
            <Button onClick={handleShow} variant="secondary" className="w-100 mb-2">Info</Button>

        
        <Modal //Modal for Viewing non-hired Coach
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title>{coach.personal_info.first_name} {coach.personal_info.last_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Container>
           <Row><Alert variant={alertVariant} show={showAlert}>{alertMessage}</Alert></Row>

            <Row>
                <Col xs={1}></Col>
                <Col xs={2} md={4}>
                    <img src={profile_pic}></img>
                </Col>
                <Col xs={9} md={6}>
                    
                   <h2>{coach.personal_info.first_name} {coach.personal_info.last_name}</h2>
                   <p className="fs-5 fw-lighter"> Personal Trainer  &nbsp;|&nbsp; Advanced</p>
                   
                   <p className= "lh-1"><b>Experience:&nbsp;</b>{coach.professional_info.experience_level === 0 ? "Less than a year" : coach.professional_info.experience_level + " years"}</p>
                   <p className= "lh-1"><b>Session Cost:&nbsp;</b>{coach.professional_info.hourly_rate}/hour</p>
                   <p className= "lh-1"><b>Location:&nbsp;</b>{coach.location.city}, {coach.location.state}</p> 
                   
                </Col>
            </Row>
            <Row>
                    {coach.professional_info.accepting_new_clients === 1 ? (
                    <div className="text-center"><Button size="lg" onClick={handleRequest}>Request Coach</Button></div>)
                    :(
                    <div className="text-center">    
                        <Button size="lg" disabled>Request Coach</Button>
                        <p>This user is currently not accepting clients. Please come back later.</p>
                    </div>
                    )
                    }
                
            </Row>
            <Row>
                <br/><br/>
            <div className="p-3 mb-0 bg-light text-dark">{coach.personal_info.about_me}</div>
            </Row>
           </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button className='w-100' onClick={handleClose} variant="dark">Done</Button>
        </Modal.Footer>
        </Modal>

        <Modal //Modal for viewing hired Coach
        size="lg"
        show={showHired}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title>{coach.personal_info.first_name} {coach.personal_info.last_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Container>
           <Row><Alert variant={alertVariant} show={showAlert}>{alertMessage}</Alert></Row>

            <Row>
                <Col xs={1}></Col>
                <Col xs={2} md={4}>
                    <img src={profile_pic}></img>
                </Col>
                <Col xs={9} md={6}>
                    
                   <h2>{coach.personal_info.first_name} {coach.personal_info.last_name}</h2>
                   <p className="fs-5 fw-lighter"> Personal Trainer  &nbsp;|&nbsp; Advanced</p>
                   
                   <p className= "lh-1"><b>Experience:&nbsp;</b>{coach.professional_info.experience_level === 0 ? "Less than a year" : coach.professional_info.experience_level + " years"}</p>
                   <p className= "lh-1"><b>Session Cost:&nbsp;</b>{coach.professional_info.hourly_rate}/hour</p>
                   <p className= "lh-1"><b>Location:&nbsp;</b>{coach.location.city}, {coach.location.state}</p> 
                   
                </Col>
            </Row>
            <Row>
                <div className="text-center">
                    <Button size="lg" variant="outline-primary" href="/messages">Message Coach</Button>
                    <br/>
                </div>
            </Row>
            <Row>
                    <div className="text-center">
                        <Button size="md" variant="danger" onClick={handleShowTerm}>End Training</Button>
        
                    </div>
            </Row>
            <Row>
                <br/><br/>
            <div className="p-3 mb-0 bg-light text-dark">{coach.personal_info.about_me}</div>
            </Row>
           </Container>
        </Modal.Body>
        <Modal.Footer>
            <Button className='w-100' onClick={handleClose} variant="dark">Done</Button>
        </Modal.Footer>
        </Modal>

        <Modal //Modal for ending training
        size="md" 
        show={showTerm} 
        onHide={handleCloseTerm} 
        backdrop="static" 
        keyboard={false} 
        centered> 
        <Modal.Header closeButton>
          <Modal.Title>End Training</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
          <p>Are you sure you want to end training with <b>{coach.personal_info.first_name} {coach.personal_info.last_name}</b>?</p>
          <p>This will permanently delete all interactions between you and the coach (messages, workout plans, etc.)</p>
          <b>This action cannot be undone.</b>
          </center>
        </Modal.Body>
        <Modal.Footer><Button className='w-100' onClick={()=> terminateCoach()} variant="danger">End Training</Button></Modal.Footer>
      </Modal>
    </div>
  )
}

export default ViewCoachProfile
