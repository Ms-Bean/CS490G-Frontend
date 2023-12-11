import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./views/RegisterPage";
import PrivateRoute from "./utils/PrivateRoute";
import PrivateRoutes from "./utils/PrivateRoutes";
import NavComp from "./components/NavComp";
import Footer from "./components/Footer";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import Onboarding from "./views/Onboarding";
import AccountPage from "./views/AccountPage";
import Dashboard from "./views/Dashboard";
import ProfilePage from "./views/ProfilePage";
import MessagePage from "./views/MessagePage";
import CoachSearch from "./views/CoachSearch";
import DailySurvey from "./views/DailySurvey";
import ExerciseManagement from "./views/ExerciseManagement";
import CoachDashboard from "./views/CoachDashboard";
import WorkoutPlan from "./views/WorkoutPlan";
import SelectWorkoutPlan from "./views/SelectWorkoutPlan";
import { ExerciseProvider } from "./context/exerciseContext";
import "./css/Pagination.css";
import "./css/Footer.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="site-container">
          <NavComp />
          <main className="site-main">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute link={"/dashboard"}>
                    <HomePage />
                  </PrivateRoute>
                }
                exact
              />
              {/* <Route path="/registration" element={
              <PrivateRoute link={"/dashboard"}>
                <RegisterPage/>
              </PrivateRoute>
            } exact/> */}
              <Route element={<PrivateRoutes link="/login" />}>
                {/* <Route path='/onboard' element={<Onboarding/>}/> */}
                <Route path="/account" element={<AccountPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/coaches" element={<CoachSearch />} />
                <Route path="/messages" element={<MessagePage />} />
                <Route path="/coach_dashboard" element={<CoachDashboard />} />
                <Route path="/select_workout_plan" element={<SelectWorkoutPlan />} />
                <Route path="workout_plan" element={<WorkoutPlan />} />
                <Route path="/daily_survey" element={<DailySurvey />} />
              </Route>
              <Route path="/onboard" element={<Onboarding />} />
              <Route path="/registration" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} exact />
              <Route
                path="/exercise_management"
                element={
                  <ExerciseProvider>
                    <ExerciseManagement />
                  </ExerciseProvider>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
