import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { config } from "./../utils/config";
import { Card, Row, Col, Container, Alert, Tab, Tabs, Button } from "react-bootstrap";
import DashboardNavbar from "./Dashboard/DashboardNavbar";
import { Line, Bar, Pie } from "react-chartjs-2";
import "./../css/Dashboard.css";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import DailySurveyForm from "./../views/DailySurvey";
import CoachClientDashboard from "./CoachClientDashboard";
import { useAuth } from "../hooks/useAuth";

const CoachDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const client_id = urlParams.get("client_id");
  const [userRole, setUserRole] = useState("");
  const [currentTab, setCurrentTab] = useState("");
  const [showPermissionAlert, setShowPermissionAlert] = useState(false);
  const [targetWeight, setTargetWeight] = useState(null);
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

  console.log("user", user);

  const [exerciseData, setExerciseData] = useState([]);
  const [chart_data, set_chart_data] = useState({
    x: [],
    calories_burned_y: [],
    calories_consumed_y: [],
    water_intake_y: [],
    weight_y: [],
  });

  const fetchTargetWeight = async () => {
    try {
      const url = client_id
        ? `${config.backendUrl}/get_client_target_weight/${client_id}`
        : `${config.backendUrl}/get_client_target_weight`;

      const response = await fetch(url, {
        credentials: "include",
        // headers are no longer necessary as client_id is either in the URL or taken from session
      });

      if (!response.ok) throw new Error("Failed to fetch target weight");
      const data = await response.json();
      setTargetWeight(data.target_weight);
    } catch (error) {
      console.error("Error fetching target weight:", error);
    }
  };

  const fetchClientDashboardInfo = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/get_client_dashboard_info`, {
        credentials: "include",
        headers: {
          client_id: client_id,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch client dashboard info");
      const data = await response.json();

      if (data.message) {
        setShowPermissionAlert(true); // Show alert if there's an issue with permissions
        return;
      }

      // Process and set the data for daily surveys
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

      // Process and set data for mood
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

      // Set exercise data
      setExerciseData(data.days);
    } catch (error) {
      console.error("Error fetching client dashboard info:", error);
    }
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/get_role`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch user role");
        const data = await response.json();
        setUserRole(data.message);
        setCurrentTab(data.message === "coach" ? "coachClientDashboard" : "weeklyView");
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    fetchClientDashboardInfo();
    fetchTargetWeight();
    const hash = location.hash.replace("#", "");
    if (hash) setCurrentTab(hash);
  }, [client_id, location.hash]);

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
      <Card className="w-100" style={{ minHeight: "250px" }}>
        <Card.Header>
          <Card.Title>{capitalizeFirstLetter(dayData.weekday)}</Card.Title>
        </Card.Header>
        <Card.Body>{dayData.exercises.length > 0 ? dayData.exercises.map(renderExerciseDetails) : <p>No exercises scheduled</p>}</Card.Body>
      </Card>
    );
  };

  const renderLineChart = (label, data, color, chartTitle, yAxisTitle, targetWeight) => (
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

  const renderWeightChart = (label, data, color, chartTitle, yAxisTitle, targetWeight) => (
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
          {
            label: "Target Weight",
            data: chart_data.x.map(() => targetWeight), // Create an array with the same length as the x-axis, filled with the target weight value
            fill: false,
            borderWidth: 2,
            borderDash: [10, 5],
            borderColor: "orange",
            pointRadius: 0,
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

  const renderMoodPieChart = () => (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} lg={4}>
          <div style={{ position: "relative", height: "60vh", width: "80vw" }}>
            <Pie
              data={moodData}
              options={{
                animation: {
                  duration: 0,
                },
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );

  const renderTabContent = () => {
    const isViewingClientData = !!client_id;

    const handleResetDashboard = () => {
      window.history.pushState({}, document.title, "/dashboard"); // Reset URL (remove client_id)
      fetchClientDashboardInfo(); // Refetch data for the coach
      setCurrentTab("coachClientDashboard");
    };

    const clientDataAlert = isViewingClientData && (
      <Alert variant="info d-flex flex-column align-items-center">
        <Alert.Heading>Viewing Client Data</Alert.Heading>
        <p>You are currently viewing data for a client.</p>
        <Button variant="dark" onClick={handleResetDashboard}>
          View My Dashboard
        </Button>
      </Alert>
    );

    switch (currentTab) {
      case "weeklyView":
        return (
          <>
            {clientDataAlert}
            <Row>
              {[...Array(6)].map((_, i) => (
                <Col md={4} className="mb-4 d-flex" key={i}>
                  {renderExerciseCard(i)}
                </Col>
              ))}
            </Row>
          </>
        );
      case "statisticsView":
        return (
          <>
            {clientDataAlert}
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
                {renderWeightChart("Weight", chart_data.weight_y, "purple", "Weight", "Pounds", targetWeight)}
              </Tab>
              <Tab eventKey="moodPieChart" title="Mood Pie Chart">
                {renderMoodPieChart()}
              </Tab>
            </Tabs>
          </>
        );
      case "dailySurvey":
        return <DailySurveyForm />;
      case "coachClientDashboard":
        return <CoachClientDashboard />;
      default:
        return null;
    }
  };

  return (
    <>
      <DashboardNavbar onTabSelect={setCurrentTab} isDisabled={showPermissionAlert} currentTab={currentTab} userRole={userRole} />
      <Container className="my-3">
        {showPermissionAlert && (
          <Alert variant="danger" onClose={() => setShowPermissionAlert(false)} dismissible>
            <Alert.Heading>Access Denied</Alert.Heading>
            <p>You do not have permission to view this page.</p>
          </Alert>
        )}
        <div id="wrapper" className="mt-3 mb-5">
          {renderTabContent()}
        </div>
      </Container>
    </>
  );
};

export default CoachDashboard;
