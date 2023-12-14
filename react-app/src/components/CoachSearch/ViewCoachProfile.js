import { useState, useEffect } from 'react';
import {Modal, Button, Container, Row, Col, Tooltip, OverlayTrigger} from 'react-bootstrap';
import profile_pic from "../static_images/default-avatar-profile-icon-of-social-media-user-vector.jpg";
import "../../css/ViewCoachProf.css"
import { useAuth } from '../../hooks/useAuth';

function ViewCoachProfile({ coach }) {
    const [show, setShow] = useState(false);
    const [requested, setRequested] = useState();
    const [coachData, setCoachData] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const url = `http://localhost:3500/request_coach`

    const {user} = useAuth();

    const data = {
        coach_id : coach.coach_id,
        client_id : user.user_id
    }
    useEffect(() => {
        //Fetch coach profile information //NOT WORKING YET, need to retrieve by user id
        fetch("http://localhost:3500/get_user_profile", {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setCoachData({
              hourly_rate: data.response.coach_profile_info.hourly_rate,
              availability: data.response.coach_profile_info.availability,
              experience_level: data.response.coach_profile_info.experience_level,
              accepting_new_clients: data.response.coach_profile_info.accepting_new_clients,
              coaching_history: data.response.coach_profile_info.coaching_history,
              paypal_link: data.response.coach_profile_info.paypal_link
            });
          });
      }, []);
    const reqCoach = async () => {
        try{
            const response = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include", 
            });
            console.log(response);
    
            if (!response.ok) {
                throw new Error(`Failed to request coach. Status: ${response.status}`);
            }
    
        } catch(err){
            console.log(err);
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
            <Row>
                <Col xs={1}></Col>
                <Col xs={2} md={4}>
                    <img src={profile_pic}></img>
                </Col>
                <Col xs={9} md={6}>
                    
                   <h2>{coach.personal_info.first_name} {coach.personal_info.last_name}</h2>
                   <p className="fs-5 fw-lighter"> Personal Trainer  &nbsp;|&nbsp; Advanced</p>
                   
                   <p className= "lh-1"><b>Specialty:&nbsp;</b>???</p>
                   <p className= "lh-1"><b>Experience:&nbsp;</b>{coach.professional_info.experience_level === 0 ? "Less than a year" : coach.professional_info.experience_level + " years"}</p>
                   <p className= "lh-1"><b>Session Cost:&nbsp;</b>{coach.professional_info.hourly_rate}/hour</p>
                   <p className= "lh-1"><b>Availability:&nbsp;</b>???</p>
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
