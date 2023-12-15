import { useState, useEffect } from 'react';
import {Modal, Button, Container, Row, Col, Tooltip, OverlayTrigger, Alert} from 'react-bootstrap';
import profile_pic from "../static_images/default-avatar-profile-icon-of-social-media-user-vector.jpg";
import "../../css/ViewCoachProf.css"
import { useAuth } from '../../hooks/useAuth';
import { config } from "./../../utils/config";

function ViewCoachProfile({ coach }) {
    const [show, setShow] = useState(false);
    const [requested, setRequested] = useState();
    const [coachData, setCoachData] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const url = `${config.backendUrl}/request_coach`

    const {user} = useAuth();

    const data = {
        coach_id : coach.coach_id,
        client_id : user.user_id
    }
    useEffect(() => {
        //getProfInfo(); very broken
      }, []);

      const getProfInfo = async (id) => {
        fetch(`${config.backendUrl}/get_profile_info?user_id=${id}`, { credentials: "include" }).then((res) => {
          res.json().then((data) => {
            console.log(data)
            if (!res.ok){throw new Error("Network response was not ok");}
          });
        });
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
            setAlertMessage(err.message);
            setAlertVariant('danger');
            setShowAlert(true);
        }
    }
    

    const handleRequest=()=>{
        reqCoach();
    }
  return (
    <div>
            <button onClick={handleShow} className="btn btn-secondary">Info</button>
        <Modal
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
    </div>
  )
}

export default ViewCoachProfile
