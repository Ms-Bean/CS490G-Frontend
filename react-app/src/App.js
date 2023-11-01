  import React from "react";
  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import { RegisterPage } from "./Registration";
  import NavComp from "./NavComp";
  import UserRoleSelection from "./UserRoleSelection";
  import HomePage from "./HomePage";
  import LoginPage from "./LoginPage";

  const App = () => {
    return (
      <BrowserRouter>
        <NavComp />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="/role" element={<UserRoleSelection />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
  };

  export default App;
