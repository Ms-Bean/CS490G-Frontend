import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import { Container } from "react-bootstrap";
import Chart from 'chart.js/auto';
import {useParams} from "react-router-dom";
import { config } from "./../utils/config";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let client_id = urlParams.get("client_id");

const CoachDashboard = () => {
  console.log(client_id);
  const [chart_data, set_chart_data] = useState({
    x:[],
    calories_burned_y:[],
    calories_consumed_y:[],
    water_intake_y:[],
    weight_y:[]
  });

  useEffect(() => {
    fetch(`${config.backendUrl}/get_client_dashboard_info`, {
      credentials: "include",
      headers: {
        client_id: client_id
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.message)
        {
          document.getElementById("wrapper").innerHTML="You do not have permission to view this page";
          return;
        }
        let daily_survey_x = [];
        let calories_burned_y = [];
        let calories_consumed_y = [];
        let water_intake_y = [];
        let weight_y = [];
        for(let i = 0; i < data.daily_surveys.length; i++)
        {
          daily_survey_x.push(data.daily_surveys[i].date.slice(0, 10));
          calories_burned_y.push(data.daily_surveys[i].calories_burned);
          water_intake_y.push(data.daily_surveys[i].water_intake);
          calories_consumed_y.push(data.daily_surveys[i].calories_consumed);
          weight_y.push(data.daily_surveys[i].weight);

          if(i < data.daily_surveys.length - 1)
          {
            let nextdate = new Date(data.daily_surveys[i+1].date.slice(0,10) + "T00:00:00");
            let currdate = new Date(data.daily_surveys[i].date.slice(0,10) + "T00:00:00");
            for(currdate.setDate(currdate.getDate() + 1); currdate.getDate() < nextdate.getDate(); currdate.setDate(currdate.getDate() + 1))
            {
              daily_survey_x.push(currdate.toISOString().split('T')[0]);
              calories_burned_y.push(undefined);
              calories_consumed_y.push(undefined);
              water_intake_y.push(undefined);
              weight_y.push(undefined);
            }
          }
        }
        set_chart_data({
          x: daily_survey_x,
          calories_burned_y: calories_burned_y,
          calories_consumed_y: calories_consumed_y,
          water_intake_y: water_intake_y,
          weight_y: weight_y
        })
        

        for(let i = 0; i < data.days.length; i++)
        {
          if(i === data.days.length - 1)
          {
            document.getElementById("day" + i + "weekday").innerHTML="Today";
          }
          else
            document.getElementById("day" + i + "weekday").innerHTML=data.days[i].weekday.toUpperCase().charAt(0) + data.days[i].weekday.slice(1);


          for(let j = 0; j < data.days[i].exercises.length; j++)
          {
            document.getElementById("scheduled" + i).innerHTML = "";
            document.getElementById("logged" + i).innerHTML = "";
            
            let scheduled = document.createElement("li");
            let string = "";

            string += data.days[i].exercises[j].exercise_name + ": ";
            if(data.days[i].exercises[j].expected_num_sets !== undefined)
            {
              string += data.days[i].exercises[j].expected_num_sets + " sets, ";
            }
            if(data.days[i].exercises[j].expected_reps_per_set !== undefined)
            {
              string += data.days[i].exercises[j].expected_reps_per_set + " reps, ";
            }

            if(data.days[i].exercises[j].expected_weight !== undefined)
            {
              string += data.days[i].exercises[j].expected_weight + " pounds, ";
            }
            string = string.substring(0, string.length - 2);
            string = string + " at " + data.days[i].exercises[j].time;
            scheduled.innerHTML = string;
            document.getElementById("scheduled" + i).appendChild(scheduled);

            for(let k = 0; k < data.days[i].exercises[j].logged_sets.length; k++)
            {
              let set_title = document.createTextNode(data.days[i].exercises[j].exercise_name + ", Set " + (k + 1));
              let sublist = document.createElement("li");
              sublist.appendChild(set_title);
              let subul = document.createElement("ul");
              if(data.days[i].exercises[j].logged_sets[k].logged_reps)
              {
                let subli = document.createElement("li");
                subli.innerHTML = "Reps: " + data.days[i].exercises[j].logged_sets[k].logged_reps;
                subul.appendChild(subli);
              }
              if(data.days[i].exercises[j].logged_sets[k].logged_weight)
              {
                let subli = document.createElement("li");
                subli.innerHTML = "Weight: " + data.days[i].exercises[j].logged_sets[k].logged_weight;
                subul.appendChild(subli);
              }
              sublist.appendChild(subul);
              document.getElementById("logged" + i).appendChild(sublist);
            }
          }
        }
      });
  }, []);

    return (
      <Container>
        <div id="wrapper" className="mt-3">
          <h1>This week's history</h1>
          <br></br>
            <div class="card">
              <div class="card-body" id="day0">
                <h3 id="day0weekday"></h3>
                <div class="row">
                  <div class="col-lg-6 mb-4">
                    <div class="card">
                      Scheduled exercises
                      <ul id="scheduled0"></ul>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card">
                      Logged exercises
                      <ul id="logged0"></ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-body" id="day1">
                <h3 id="day1weekday"></h3>
                <div class="row">
                  <div class="col-lg-6 mb-4">
                    <div class="card">
                      Scheduled exercises
                      <ul id="scheduled1"></ul>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card">
                      Logged exercises
                      <ul id="logged1"></ul>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body" id="day2">
              <h3 id="day2weekday"></h3>
              <div class="row">
                <div class="col-lg-6 mb-4">
                  <div class="card">
                    Scheduled exercises
                    <ul id="scheduled2"></ul>
                  </div>
                </div>
                <div class="col-lg-6 mb-4">
                  <div class="card">
                    Logged exercises
                    <ul id="logged2"></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body" id="day3">
              <h3 id="day3weekday"></h3>
              <div class="row">
                <div class="col-lg-6 mb-4">
                  <div class="card">
                    Scheduled exercises
                    <ul id="scheduled3"></ul>
                  </div>
                </div>
                <div class="col-lg-6 mb-4">
                  <div class="card">
                    Logged exercises
                    <ul id="logged3"></ul>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div class="card">
              <div class="card-body" id="day4">
                <h3 id="day4weekday"></h3>
                <div class="row">
                  <div class="col-lg-6 mb-4">
                    <div class="card">
                      Scheduled exercises
                      <ul id="scheduled4"></ul>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-4">
                    <div class="card">
                      Logged exercises
                      <ul id="logged4"></ul>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <br></br>
          <h1>Statistics</h1>
          <br></br>
          <div className="chart-container">
            <Line
              data={{
                labels: chart_data.x,
                datasets: [
                  {
                    label: "Calories burned",
                    data: chart_data.calories_burned_y,
                    fill: false,
                    borderWidth: 4,
                    backgroundColor: "green",
                    borderColor: "green",
                  },
                  {
                    label: "Calories consumed",
                    data: chart_data.calories_consumed_y,
                    fill: false,
                    borderWidth: 4,
                    backgroundColor: "red",
                    borderColor: "red",
                  },
                ],
              }}
            />
            <Line
              data={{
                labels: chart_data.x,
                datasets: [
                  {
                    label: "Water Intake (Liters)",
                    data: chart_data.water_intake_y,
                    fill: false,
                    borderWidth: 4,
                    backgroundColor: "blue",
                    borderColor: "blue",
                  },
                ],
              }}
            />
            <Line
              data={{
                labels: chart_data.x,
                datasets: [
                  {
                    label: "Weight",
                    data: chart_data.weight_y,
                    fill: false,
                    borderWidth: 4,
                    backgroundColor: "purple",
                    borderColor: "purple",
                  },
                ],
              }}
            />
          </div>
        </div>
      </Container>
    );
};

export default CoachDashboard;