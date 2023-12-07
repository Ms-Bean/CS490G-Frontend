import React from "react";
import { Dropdown } from "react-bootstrap";
import { FaSearch} from "react-icons/fa";
import NewWorkoutPlan from "./NewWorkoutPlan";

const WorkoutNavbar = ({onSort, onSearch, sortKey, onToggleSortDirection, sortDirection, handleUploadSuccessChange}) => {

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
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <div className="navbar-brand">
                    Workout Plan
                    <NewWorkoutPlan handleUploadSuccessChange={handleUploadSuccessChange}/>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex ms-auto" role="search">
                        <input onChange={handleSearchChange} className="form-control" type="search" placeholder="Search By Workout" aria-label="Search"/>
                        <button className="btn btn-secondary ms-2" type="submit">
                            <FaSearch />
                        </button>
                        <Dropdown variant="secondary" className="ms-2" onSelect={handleSortOptionClick}>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic-button">
                                Sort By
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="name">Name{getSortDirectionSymbol("name")}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <input className="btn btn-secondary mx-2" type="button" value="Filter By"/> */}
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default WorkoutNavbar;
