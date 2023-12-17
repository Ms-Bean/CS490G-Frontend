import React from "react";
import { Dropdown, Button } from "react-bootstrap";
import { FaSearch, FaPlusCircle, FaCog } from "react-icons/fa";
import NewWorkoutPlan from "./NewWorkoutPlan";

const WorkoutNavbar = ({
  onSort,
  onSearch,
  sortKey,
  onToggleSortDirection,
  sortDirection,
  handleUploadSuccessChange,
  user_id,
  handleAssignClick,
  toggleLogModal,
}) => {
  const handleSortOptionClick = (key) => {
    if (sortKey === key) {
      onToggleSortDirection();
    } else {
      onSort(key);
    }
  };

  const getSortDirectionSymbol = (key) => {
    return sortKey === key ? (sortDirection === "ascending" ? " ↑" : " ↓") : "";
  };

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div className="navbar-brand">Workout Plan</div>
          <NewWorkoutPlan
            handleUploadSuccessChange={handleUploadSuccessChange}
            user_id={user_id}
            button={<FaPlusCircle className="align-self-center" size={22} style={{ color: "white" }} />}
          />
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
          <div className="d-flex ms-auto align-items-center">
            <Button onClick={toggleLogModal} variant="secondary" className="me-2">
              Log Today's Exercises
            </Button>
            <form className="d-flex ms-auto" role="search">
              <input
                onChange={handleSearchChange}
                className="form-control ms-auto"
                type="search"
                placeholder="Search By name..."
                aria-label="Search"
              />
              <span className="navbar-text-link align-self-center" variant="secondary" type="submit">
                <FaSearch />
              </span>
              {/* <button className="btn btn-secondary ms-2" type="submit">
                            <FaSearch />
                        </button> */}
              {/* <span className="navbar-text-link align-self-center" style={{ cursor: "pointer" }}>
                          Filter By ▾
                        </span> */}
              <Dropdown className=" navbar-text-link align-self-center ms-2" onSelect={handleSortOptionClick}>
                <Dropdown.Toggle as="span" id="dropdown-basic-button" style={{ cursor: "pointer" }}>
                  Sort By ▾
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="name">Name{getSortDirectionSymbol("name")}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown align="end" className="navbar-text-link align-self-center ms-2">
                <Dropdown.Toggle as="span" id="dropdown-basic-button" style={{ cursor: "pointer" }}>
                  <FaCog size={22} style={{ color: "white" }} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleAssignClick()}>Choose a new workout plan</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default WorkoutNavbar;
