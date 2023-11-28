import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./views/RegisterPage";
import PrivateRoute from "./utils/PrivateRoute";
import PrivateRoutes from "./utils/PrivateRoutes";
import NavComp from "./components/NavComp";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import Onboarding from "./views/Onboarding";
import AccountPage from "./views/AccountPage";
import Dashboard from "./views/Dashboard";
import ProfilePage from "./views/ProfilePage";
import MessagePage from "./views/MessagePage";
import CoachSearch from "./views/CoachSearch";


const App = () => {

  return (
    <div>
      <BrowserRouter>
          <NavComp />
          <Routes>
            <Route path="/" element={
              <PrivateRoute link={"/dashboard"}>
                <HomePage/>
              </PrivateRoute>
            } exact/>
            {/* <Route path="/registration" element={
              <PrivateRoute link={"/dashboard"}>
                <RegisterPage/>
              </PrivateRoute>
            } exact/> */}
            <Route element={<PrivateRoutes link="/login"/>}>
              {/* <Route path='/onboard' element={<Onboarding/>}/> */}
              <Route path="/account" element={<AccountPage/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/profile" element={<ProfilePage/>}/>
              <Route path="/coaches" element={<CoachSearch/>}/>
              <Route path="/messages" element={<MessagePage/>}/>
            </Route>
            <Route path='/onboard' element={<Onboarding/>}/>
            <Route path='/registration' element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage />} exact/>
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
