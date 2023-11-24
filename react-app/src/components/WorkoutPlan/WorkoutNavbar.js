import React from "react";
import { Dropdown } from "react-bootstrap";
import { FaSearch, FaPlusCircle} from "react-icons/fa";
import NewWorkoutPlan from "./NewWorkoutPlan";

const WorkoutNavbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <div className="navbar-brand">
                Workout Plan
                <NewWorkoutPlan/>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <form class="d-flex ms-auto" role="search">
                    <input class="form-control" type="search" placeholder="Search By Workout" aria-label="Search"/>
                    <button className="btn btn-secondary ms-2" type="submit">
                        <FaSearch />
                    </button>
                    <Dropdown variant="secondary" className="ms-2">
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
                            Sort By
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Name</Dropdown.Item>
                            <Dropdown.Item>Date</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <input className="btn btn-secondary mx-2" type="button" value="Filter By"/>
                </form>
            </div>
        </div>
    </nav>
  );
};

export default WorkoutNavbar;
