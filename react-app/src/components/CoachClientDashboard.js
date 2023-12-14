import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewWorkoutPlan from "./WorkoutPlan/NewWorkoutPlan";
import { config } from "./../utils/config";

const CoachClientDashboard = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyticsClick = (clientId) => {
    navigate(`?client_id=${clientId}#statisticsView`);
  };

  useEffect(() => {
    const fetch_coach_dashboard_info = async () => {
      try{
        setIsLoading(true);
        const response = await fetch(`${config.backendUrl}/get_coach_dashboard_info`, {
            credentials: "include",
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setClients(data);
        console.log(data);
      }
      catch(err){
        console.log(err);
      }finally{
        setIsLoading(false);
      }
      }

      fetch_coach_dashboard_info();
  }, [])
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
    //             <button onclick="window.location='page_name.php';" value="click here" />*/

    //             document.getElementById("clients_table").appendChild(newTr);
    //         }
    //       });
    //   });

  const handleUploadSuccessChange = () => {
    setUploadSuccess(true);
  }

  return (
    <div className="container">
        <h1>Your Clients</h1>
        <table class="table">
        <thead>
            <tr>
            <th scope="col">User</th>
            <th scope="col">Workout plan</th>
            <th scope="col">Client's Analytics</th>
            <th scope="col"></th>
            </tr>
        </thead>
        {/* <tbody id="clients_table">
        </tbody> */}
        <tbody>
          {clients.map((client, index) => (
            <tr>
              <td>{client.username}</td>
              <td><button>{client.name}</button></td>
              <td><button onClick={() => handleAnalyticsClick(client.client_id)}>Analytics</button></td>
              <td><NewWorkoutPlan handleUploadSuccessChange={handleUploadSuccessChange} user_id={client.client_id} button={<button>Create Workout Plan</button>}/></td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
};

export default CoachClientDashboard;
