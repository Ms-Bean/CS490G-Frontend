import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { config } from "./../utils/config";
import { Card, Row, Col, Container, Alert, Tab, Tabs } from "react-bootstrap";
import DashboardNavbar from "./Dashboard/DashboardNavbar";
import { Line, Bar, Pie } from "react-chartjs-2";
import "./../css/Dashboard.css";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let client_id = urlParams.get("client_id");

const CoachDashboard = () => {
  const [currentTab, setCurrentTab] = useState("weeklyView");
  const [showPermissionAlert, setShowPermissionAlert] = useState(false);
  const [moodData, setMoodData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  });

  const handleTabSelect = (tabKey) => {
    setCurrentTab(tabKey);
  };

  console.log(client_id);

  const [exerciseData, setExerciseData] = useState([]);
  const [chart_data, set_chart_data] = useState({
    x: [],
    calories_burned_y: [],
    calories_consumed_y: [],
    water_intake_y: [],
    weight_y: [],
  });

  useEffect(() => {
    fetch(`${config.backendUrl}/get_client_dashboard_info`, {
      credentials: "include",
      headers: {
        client_id: client_id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setShowPermissionAlert(true); // Show alert instead of changing innerHTML
          return;
        }

        let daily_survey_x = [];
        let calories_burned_y = [];
        let calories_consumed_y = [];
        let water_intake_y = [];
        let weight_y = [];

        for (let i = 0; i < data.daily_surveys.length; i++) {
          daily_survey_x.push(data.daily_surveys[i].date.slice(0, 10));
          calories_burned_y.push(data.daily_surveys[i].calories_burned);
          water_intake_y.push(data.daily_surveys[i].water_intake);
          calories_consumed_y.push(data.daily_surveys[i].calories_consumed);
          weight_y.push(data.daily_surveys[i].weight);

          if (i < data.daily_surveys.length - 1) {
            let nextdate = new Date(data.daily_surveys[i + 1].date.slice(0, 10) + "T00:00:00");
            let currdate = new Date(data.daily_surveys[i].date.slice(0, 10) + "T00:00:00");
            for (
              currdate.setDate(currdate.getDate() + 1);
              currdate.getDate() < nextdate.getDate();
              currdate.setDate(currdate.getDate() + 1)
            ) {
              daily_survey_x.push(currdate.toISOString().split("T")[0]);
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
          weight_y: weight_y,
        });

        const moodCounts = data.daily_surveys.reduce((acc, survey) => {
          acc[survey.mood] = (acc[survey.mood] || 0) + 1;
          return acc;
        }, {});
    
        setMoodData({
          labels: Object.keys(moodCounts),
          datasets: [
            {
              data: Object.values(moodCounts),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        });
    

        setExerciseData(data.days);
      });

  }, [client_id]);

  const formatDateLabels = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`; // Formats to MM/DD
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderExerciseCard = (day) => {
    const dayData = exerciseData[day];
    if (!dayData) {
      return null;
    }

    const renderExerciseDetails = (exercise) => (
      <div key={exercise.workout_exercise_id}>
        <strong>{exercise.exercise_name}</strong>
        <br />
        Time: {exercise.time}
        <br />
        Expected Sets: {exercise.expected_num_sets}
        <br />
        Reps per Set: {exercise.expected_reps_per_set}
        <br />
        Expected Weight: {exercise.expected_weight} kg
        {exercise.logged_sets && exercise.logged_sets.length > 0 && (
          <div>
            <h6>Logged Sets:</h6>
            {exercise.logged_sets.map((set, index) => (
              <p key={index}>
                Set {index + 1}: {set.actual_reps} reps, {set.actual_weight} kg
              </p>
            ))}
          </div>
        )}
      </div>
    );

    return (
      <Card className="shadow-sm w-100" style={{ minHeight: "300px" }}>
        <Card.Header>
          <Card.Title>{capitalizeFirstLetter(dayData.weekday)}</Card.Title>
        </Card.Header>
        <Card.Body>{dayData.exercises.length > 0 ? dayData.exercises.map(renderExerciseDetails) : <p>No exercises scheduled</p>}</Card.Body>
      </Card>
    );
  };

  const renderLineChart = (label, data, color, chartTitle, yAxisTitle) => (
    <Line
      className="mx-3"
      data={{
        labels: chart_data.x.map((date) => formatDateLabels(date)),
        datasets: [
          {
            label,
            data,
            fill: false,
            borderWidth: 4,
            backgroundColor: color,
            borderColor: color,
          },
        ],
      }}
      options={{
        animation: false,
        plugins: {
          title: {
            display: true,
            text: chartTitle,
            font: {
              size: 18,
            },
          },
          legend: {
            position: "top",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: yAxisTitle,
            },
          },
        },
      }}
    />
  );

  const renderCombinedCaloriesChart = (burnedData, consumedData) => (
    <Line
      className="mx-3"
      data={{
        labels: chart_data.x.map((date) => formatDateLabels(date)),
        datasets: [
          {
            label: "Calories Burned",
            data: burnedData,
            fill: false,
            borderWidth: 4,
            backgroundColor: "green",
            borderColor: "green",
          },
          {
            label: "Calories Consumed",
            data: consumedData,
            fill: false,
            borderWidth: 4,
            backgroundColor: "red",
            borderColor: "red",
          },
        ],
      }}
      options={{
        animation: false, // Disable animations
      }}
    />
  );

  const calculateNetCalories = (burnedData, consumedData) => {
    return burnedData.map((burned, index) => {
      const consumed = consumedData[index] || 0;
      return consumed - (burned || 0); // If data is undefined, treat as 0
    });
  };

  const renderNetCaloriesChart = (burnedData, consumedData) => {
    const netCalories = calculateNetCalories(burnedData, consumedData);
    const netCaloriesColors = netCalories.map((value) => (value >= 0 ? "blue" : "red"));

    return (
      <Bar
        className="mx-3"
        data={{
          labels: chart_data.x.map((date) => formatDateLabels(date)),
          datasets: [
            {
              label: "Net Calories",
              data: netCalories,
              backgroundColor: netCaloriesColors,
              borderColor: netCaloriesColors,
            },
          ],
        }}
        options={{
          animation: false, // Disable animations
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    );
  };

  const renderMoodPieChart = () => <Pie data={moodData} />;

  return (
    <>
      <DashboardNavbar onTabSelect={handleTabSelect} isDisabled={showPermissionAlert} />
      <Container className="my-3">
        {showPermissionAlert && (
          <Alert variant="danger" onClose={() => setShowPermissionAlert(false)} dismissible>
            <Alert.Heading>Access Denied</Alert.Heading>
            <p>You do not have permission to view this page.</p>
          </Alert>
        )}
        <div id="wrapper" className="mt-3 mb-5">
          {currentTab === "weeklyView" && (
            <>
              <p><h2>This Week</h2></p>
              <Row>
                {[...Array(5)].map((_, i) => (
                  <Col md={4} className="mb-4 d-flex" key={i}>
                    {renderExerciseCard(i)}
                  </Col>
                ))}
              </Row>
            </>
          )}

          {currentTab === "statisticsView" && (
            <>
              <p><h2>Statistics</h2></p>
              <Tabs defaultActiveKey="calories" id="chart-tabs" className="mb-3" justify>
                <Tab eventKey="calories" title="Calories">
                  {renderCombinedCaloriesChart(chart_data.calories_burned_y, chart_data.calories_consumed_y, "Calories Burned vs Consumed")}
                </Tab>
                <Tab eventKey="netCalories" title="Net Calories">
                  {renderNetCaloriesChart(chart_data.calories_burned_y, chart_data.calories_consumed_y)}
                </Tab>
                <Tab eventKey="waterIntake" title="Water Intake">
                  {renderLineChart("Water Intake (Liters)", chart_data.water_intake_y, "blue", "Daily Water Intake", "Liters")}
                </Tab>
                <Tab eventKey="weight" title="Weight">
                  {renderLineChart("Weight", chart_data.weight_y, "purple", "Weight", "Pounds")}
                </Tab>
                <Tab eventKey="moodPieChart" title="Mood Pie Chart">
                  {renderMoodPieChart()}
                </Tab>
              </Tabs>
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default CoachDashboard;
