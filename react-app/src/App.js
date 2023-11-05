import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./views/RegisterPage";
import { useAuth } from "./hooks/useAuth";
import NavComp from "./components/NavComp";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import Onboarding from "./views/Onboarding";
import Dashboard from "./views/Dashboard";

const App = () => {

  const {user} = useAuth();

  return (
    <div>
      <BrowserRouter>
          <NavComp />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registration" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />}  />
            <Route path="/onboard" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard /> }/>
          </Routes>
      </BrowserRouter>
      </div>
  );
};

export default App;
