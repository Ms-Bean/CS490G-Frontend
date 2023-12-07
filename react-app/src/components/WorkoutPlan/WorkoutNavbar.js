import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import NewWorkoutPlan from "./NewWorkoutPlan";

const WorkoutNavbar = ({ handleSortChange, handleUploadSuccessChange }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="navbar-brand">Workout Plan</div>
        <NewWorkoutPlan handleUploadSuccessChange={handleUploadSuccessChange} />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex ms-auto" role="search">
            <input className="form-control me-2" type="search" placeholder="Search by name..." aria-label="Search" />
            <span className="navbar-text-link align-self-center" variant="secondary" type="submit">
              <FaSearch />
            </span>
            <span className="navbar-text-link align-self-center" style={{ cursor: "pointer" }}>
              Filter By ▾
            </span>
            <Dropdown className="navbar-text-link align-self-center">
              <Dropdown.Toggle as="span" id="dropdown-basic-button" style={{ cursor: "pointer" }}>
                Sort By ▾
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange("name")}>Name</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("date")}>Date</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default WorkoutNavbar;
