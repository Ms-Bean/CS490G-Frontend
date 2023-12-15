import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Table, Container, Dropdown, Image, DropdownButton, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NewWorkoutPlan from "./WorkoutPlan/NewWorkoutPlan";
import { config } from "./../utils/config";
import AcceptDenyClients from "./AcceptDenyClients";

const CoachClientDashboard = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAnalyticsClick = (clientId) => {
    navigate(`?client_id=${clientId}#statisticsView`);
  };

  const handleLogClick = (clientId) => {
    navigate(`?client_id=${clientId}#weeklyView`);
  };

  const handleAssignClick = (clientId) => {

    navigate("../select_workout_plan?user_id=" + clientId);
  }

  useEffect(() => {
    const fetch_coach_dashboard_info = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${config.backendUrl}/get_coach_dashboard_info`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setClients(data);
        // console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetch_coach_dashboard_info();
  }, []);

  // useEffect(() => {
  //     //Fetch client profile information
  //     fetch("http://localhost:3500/get_coach_dashboard_info", {
  //       credentials: "include",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         document.getElementById("clients_table").innerHTML = "";
  //         for(let i = 0; i < data.length; i++)
  //         {
  //             const newTr = document.createElement("tr");
  //             const newTh = document.createElement("th");
  //             const userName = document.createElement("td");
  //             const workoutPlan = document.createElement("td");
  //             const workoutPlanButton = document.createElement("button");
  //             const dashboardButton = document.createElement("button");

  //             const thContent = document.createTextNode((i+1).toString());
  //             const userNameContent = document.createTextNode(data[i].username);

  //             newTh.appendChild(thContent);
  //             userName.appendChild(userNameContent);
  //             workoutPlanButton.innerHTML = data[i].name;
  //             workoutPlanButton.setAttribute("onclick", "window.location='http://localhost:3000/select_workout_plan?user_id=" + data[i].client_id.toString() + "'");
  //             workoutPlan.appendChild(workoutPlanButton);

  //             dashboardButton.innerHTML = "Analyitics";
  //             dashboardButton.setAttribute("onclick", "window.location='http://localhost:3000/dashboard?client_id=" + data[i].client_id.toString() + "'");

  //             newTr.appendChild(newTh);
  //             newTr.appendChild(userName);
  //             newTr.appendChild(workoutPlan);
  //             newTr.append(dashboardButton);

  //             /*http://localhost:3000/select_workout_plan?user_id=4
  //             <Button onclick="window.location='page_name.php';" value="click here" />*/

  //             document.getElementById("clients_table").appendChild(newTr);
  //         }
  //       });
  //   });

  const handleUploadSuccessChange = () => {
    setUploadSuccess(true);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-2">Your Clients</h4>
        <Button className="mb-2" onClick={handleShow}>
          Pending Clients
        </Button>
      </div>
      <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pending Client Requests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AcceptDenyClients />
        </Modal.Body>
      </Modal>
      <table className="table responsive">
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Name</th>
            <th scope="col">Weight</th>
            <th scope="col">Mood</th>
            <th scope="col">Workout Plan</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="2">
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </td>
            </tr>
          ) : clients.length > 0 ? (
            clients.map((client, index) => (
              <tr key={index}>
                <td align="left" style={{ verticalAlign: "middle" }}>
                  <Image src="/profilepic.jpg" roundedCircle width="30" height="30" />
                  <span className="ml-2">&nbsp;&nbsp;{client.username}</span>
                </td>
                <td align="left" style={{ verticalAlign: "middle" }}>
                  {client.first_name} {client.last_name}
                </td>
                <td align="left" style={{ verticalAlign: "middle" }}>
                {client.weight ? `${client.weight} lbs` : 'Not available'}
                </td>
                <td align="left" style={{ verticalAlign: "middle" }}>
                {client.mood ? capitalizeFirstLetter(client.mood) : 'Not available'}
                </td>
                <td align="left" style={{ verticalAlign: "middle" }}>
                {client.name || 'No plan assigned'}
                </td>
                <td align="left" style={{ verticalAlign: "middle" }}>
                  <DropdownButton variant="success" id="dropdown-button-basic" title="Actions">
                    <Dropdown.Item onClick={() => navigate(`/messages`)}>Message</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => handleLogClick(client.client_id)}>Activity Log</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAnalyticsClick(client.client_id)}>View Statistics</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => handleAssignClick(client.client_id)}>Assign Workout Plan</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item variant="danger" onClick={() => navigate(`#`)}>
                      End Training
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No clients to display</td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
};

export default CoachClientDashboard;
