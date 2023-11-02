  import React from "react";
  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import { RegisterPage } from "./Registration";
  import NavComp from "./NavComp";
  import HomePage from "./HomePage";
  import LoginPage from "./LoginPage";
  import Onboarding from "./Onboarding";

  const App = () => {
    return (
      <BrowserRouter>
        <NavComp />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboard" element={<Onboarding />} />
        </Routes>
      </BrowserRouter>
    );
  };

  export default App;
