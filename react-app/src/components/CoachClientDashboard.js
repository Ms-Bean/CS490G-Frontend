import React, { useEffect } from "react";
import { config } from "../utils/config";

const CoachClientDashboard = () => {
    useEffect(() => {
        //Fetch client profile information
        fetch(`${config.backendUrl}/get_coach_dashboard_info`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            document.getElementById("clients_table").innerHTML = "";
            for(let i = 0; i < data.length; i++)
            {
                const newTr = document.createElement("tr");
                const newTh = document.createElement("th");
                const userName = document.createElement("td");
                const workoutPlan = document.createElement("td");
                const workoutPlanButton = document.createElement("button");
                const dashboardButton = document.createElement("button");

                const thContent = document.createTextNode((i+1).toString());
                const userNameContent = document.createTextNode(data[i].username);

                newTh.appendChild(thContent);
                userName.appendChild(userNameContent);
                workoutPlanButton.innerHTML = data[i].name;
                workoutPlanButton.setAttribute("onclick", `window.location='${config.backendUrl}/select_workout_plan?user_id=${data[i].client_id}'`);
                workoutPlan.appendChild(workoutPlanButton);
                
                dashboardButton.innerHTML = "Analytics";
                dashboardButton.setAttribute("onclick", `window.location='${config.backendUrl}/dashboard?client_id=${data[i].client_id}'`);
                
                newTr.appendChild(newTh);
                newTr.appendChild(userName);
                newTr.appendChild(workoutPlan);
                newTr.append(dashboardButton);
                
                document.getElementById("clients_table").appendChild(newTr);
            }
          });
      });
  return (
    <div>
        <h1>Your Clients</h1>
        <table class="table">
        <thead>
            <tr>
            <th scope="col"></th>
            <th scope="col">User</th>
            <th scope="col">Workout plan</th>
            <th scope="col">Client's Analytics</th>
            </tr>
        </thead>
        <tbody id="clients_table">
        </tbody>
        </table>
    </div>
  );
};

export default CoachClientDashboard;
