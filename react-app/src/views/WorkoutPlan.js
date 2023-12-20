import React, { useEffect, useState, useMemo } from "react";
import WorkoutNavbar from "../components/WorkoutPlan/WorkoutNavbar";
import WorkoutProgress from "../components/WorkoutPlan/WorkoutProgress";
import WorkoutPlanCard from "../components/WorkoutPlan/WorkoutCard";
// import CreateWorkoutPlanForClient from "../components/WorkoutPlan/CreateWorkoutPlanForClient.js";
import { FaRegClipboard, FaPlusCircle, FaCog } from "react-icons/fa";
import { Alert, Button, Container } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { config } from "./../utils/config";
import { useNavigate } from "react-router-dom";

const WorkoutPlan = () => {
  const navigate = useNavigate();

  const [assigned_workout_data, set_assigned_workout_data] = useState({
    workoutPlanId: "",
    workoutPlanName: "",
  });
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [isCoach, setIsCoach] = useState(false);
  const [colCount, setColCount] = useState(4);
  const [rowCount, setRowCount] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("ascending");
  const [isLoading, setIsLoading] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);

  const toggleLogModal = () => setShowLogModal(!showLogModal);

  const resetFilters = () => {
    setSearchTerm("");
    setSortKey("");
    setSortDirection("ascending");
  };

  const { user } = useAuth();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/get_role`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch role");
        const data = await response.json();
        setIsCoach(data.message === "coach");
      } catch (err) {
        console.log(err);
      }
    };

    fetchRole();
  }, []);

  const fetchWorkoutPlans = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${config.backendUrl}/workout_plan/author/?author_id=${user.user_id}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.workout_plans.length > 0) {
        setRowCount(Math.floor(data.workout_plans.length / colCount) + 1);
      }
      setWorkoutPlans(data.workout_plans);

      const assigned_response = await fetch(`${config.backendUrl}/get_client_dashboard_info`, {
        credentials: "include",
        headers: {},
      });
      if (!response.ok) throw new Error("Failed to fetch client dashboard info");
      const assigned_data = await assigned_response.json();

      console.log("Assigned workout plan", assigned_data);
      set_assigned_workout_data({
        workoutPlanId: assigned_data.workout_plan_id,
        workoutPlanName: assigned_data.workout_plan_name,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const checkUserHasWorkoutPlan = async () => {
    try {
      const response = await fetch(`${config.backendUrl}/check_user_workout_plan`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to check workout plan");

      const data = await response.json();
      if (data.workoutPlan) {
        set_assigned_workout_data({
          workoutPlanId: data.workoutPlan.workout_plan_id,
          workoutPlanName: data.workoutPlan.name,
        });
      } else {
        set_assigned_workout_data({
          workoutPlanId: "",
          workoutPlanName: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Using useEffect to check if the user has a workout plan on component mount
  useEffect(() => {
    checkUserHasWorkoutPlan();
    fetchWorkoutPlans(); // Existing function to fetch workout plans
  }, []);

  //re-renders when a workout plan has been created, edited or deleted
  useEffect(() => {
    fetchWorkoutPlans();
    setUploadSuccess(false);
  }, [uploadSuccess]);

  // Filter and sort workout plans
  const filteredAndSortedWorkoutPlans = useMemo(() => {
    let filtered = workoutPlans.filter((workoutPlan) => workoutPlan.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (sortKey) {
      filtered.sort((a, b) => {
        const modifier = sortDirection === "ascending" ? 1 : -1;
        if (a[sortKey] < b[sortKey]) {
          return -1 * modifier;
        } else if (a[sortKey] > b[sortKey]) {
          return 1 * modifier;
        }
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, sortKey, sortDirection, isLoading]);

  const createGrid = (wps) => {
    const counter = { count: 0 };
    return renderRows(wps, counter);
  };

  const renderRows = (wps, counter) => {
    let rows = [];
    for (let row = 0; row < rowCount; row++) {
      rows.push(
        <div key={`row-${row}`} className="row my-3">
          {renderCols(wps, counter)}
        </div>
      );
    }

    return rows;
  };

  const renderCols = (wps, counter) => {
    let cols = [];
    for (let col = 0; col < colCount; col++) {
      if (counter.count < wps.length) {
        cols.push(
          <div key={counter.count} className="col-lg-3">
            {
              <WorkoutPlanCard
                workoutPlanName={wps[counter.count].name}
                workoutPlanId={wps[counter.count].workout_plan_id}
                handleUploadSuccessChange={handleUploadSuccessChange}
              />
            }
          </div>
        );
        counter.count++;
      }
    }

    return cols;
  };

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) => (prevDirection === "ascending" ? "descending" : "ascending"));
  };

  const handleUploadSuccessChange = () => {
    setUploadSuccess(true);
    fetchWorkoutPlans();
  };
  const handleAssignClick = () => {
    navigate("../select_workout_plan?user_id=" + user.user_id);
  };
  return (
    <div>
      <WorkoutNavbar
        handleUploadSuccessChange={handleUploadSuccessChange}
        onSearch={(term) => setSearchTerm(term)}
        onSort={(key) => setSortKey(key)}
        sortKey={sortKey}
        onToggleSortDirection={toggleSortDirection}
        sortDirection={sortDirection}
        user_id={user.user_id}
        handleAssignClick={handleAssignClick}
        toggleLogModal={toggleLogModal}
        hasAssignedWorkoutPlan={!!assigned_workout_data.workoutPlanId}
      />
      <Container className="my-3">
        {!assigned_workout_data.workoutPlanId && workoutPlans.length > 0 && (
          <Alert variant="warning">
            <Alert.Heading>No Workout Plan Assigned</Alert.Heading>
            You don't have an assigned workout plan. To assign one, click{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleAssignClick();
              }}
              style={{ textDecoration: "underline" }}
            >
              here
            </a>{" "}
            or the{" "}
            <span>
              <FaCog />
            </span>{" "}
            button above and select "Choose a new workout plan".
          </Alert>
        )}

        {workoutPlans.length === 0 ? (
          <Alert variant="info" className="text-center rounded-0">
            <h2>
              <FaRegClipboard className="mb-1" size={30} /> No workout plans available
            </h2>
            <small>
              Create a Workout Plan by clicking{" "}
              <span>
                <FaPlusCircle />
              </span>{" "}
              above
            </small>
          </Alert>
        ) : (
          <>
            {!isLoading && filteredAndSortedWorkoutPlans.length === 0 ? (
              <Alert variant="info" className="text-center">
                <Alert.Heading>No workout plans found matching the search criteria.</Alert.Heading>{" "}
                <Button onClick={resetFilters} variant="secondary" className="mt-3">
                  Reset Search
                </Button>
              </Alert>
            ) : (
              <div className="container mt-3" style={{ minHeight: "53em" }}>
                {createGrid(filteredAndSortedWorkoutPlans)}
              </div>
            )}
            {isCoach ? <div className="d-flex justify-content-center mt-3">{/* <CreateWorkoutPlanForClient/> */}</div> : <></>}
          </>
        )}

        <div>
          {assigned_workout_data.workoutPlanId && assigned_workout_data.workoutPlanId !== "" && (
            <WorkoutProgress
              workoutPlanName={assigned_workout_data.workoutPlanName}
              workoutPlanId={assigned_workout_data.workoutPlanId}
              handleUploadSuccessChange={handleUploadSuccessChange}
              show={showLogModal}
              handleClose={() => setShowLogModal(false)}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default WorkoutPlan;
