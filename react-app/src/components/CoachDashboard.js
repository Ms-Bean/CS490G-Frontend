import React, { useEffect, useState } from "react";

const CoachDashboard = () => {
    useEffect(() => {
        //Fetch client profile information
        fetch("http://localhost:3500/get_coach_dashboard_info", {
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

                const thContent = document.createTextNode((i+1).toString());
                const userNameContent = document.createTextNode(data[i].username);

                newTh.appendChild(thContent);
                userName.appendChild(userNameContent);
                workoutPlanButton.innerHTML = data[i].name;
                workoutPlanButton.setAttribute("onclick", "window.location='http://localhost:3000/select_workout_plan?user_id=" + data[i].client_id.toString() + "'");
                workoutPlan.appendChild(workoutPlanButton);

                newTr.appendChild(newTh);
                newTr.appendChild(userName);
                newTr.appendChild(workoutPlan);

                /*http://localhost:3000/select_workout_plan?user_id=4
                <button onclick="window.location='page_name.php';" value="click here" />*/

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
            </tr>
        </thead>
        <tbody id="clients_table">
        </tbody>
        </table>
    </div>
  );
};

export default CoachDashboard;
