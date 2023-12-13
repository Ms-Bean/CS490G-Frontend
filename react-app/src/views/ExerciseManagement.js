import React, { useState, useEffect, useMemo, useContext } from "react";
import ReactPaginate from "react-paginate";
import { Container, Alert, Row, Col, Button } from "react-bootstrap";
import ExerciseCard from "../components/Exercises/ExerciseCard";
import ExerciseNavbar from "../components/Exercises/ExerciseNavbar";
import ExerciseModal from "../components/Exercises/ExerciseModal";
import { ExerciseContext } from "../context/exerciseContext";
import "./../css/ExerciseBank.css";
import { config } from "./../utils/config";

const ExerciseManagement = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { exercises } = useContext(ExerciseContext);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("ascending");
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12; // You can set this to any number you prefer

  useEffect(() => {
    const fetchRole = async () => {
      setIsLoading(true); // Set loading to true when the fetch starts
      try {
        const response = await fetch(`${config.backendUrl}/get_role`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch role");
        const data = await response.json();
        setIsAdmin(data.message === "admin");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Set loading to false when the fetch finishes
      }
    };
    fetchRole();
  }, []);

  // Filter and sort exercises
  const filteredAndSortedExercises = useMemo(() => {
    let filtered = exercises.filter((exercise) => exercise.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filters.difficultyMin !== undefined && filters.difficultyMax !== undefined) {
      filtered = filtered.filter(
        (exercise) => exercise.difficulty >= filters.difficultyMin && exercise.difficulty <= filters.difficultyMax
      );
    }

    if (filters.muscleGroups && filters.muscleGroups.length > 0) {
      filtered = filtered.filter(
        (exercise) => exercise.muscle_groups && exercise.muscle_groups.some((group) => filters.muscleGroups.includes(group))
      );
    }

    if (filters.goals && filters.goals.length > 0) {
      filtered = filtered.filter((exercise) => {
        setCurrentPage(0);
        return filters.goals.includes(exercise.goal_name);
      });
    }

    if (filters.equipmentItems && filters.equipmentItems.length > 0) {
      filtered = filtered.filter(
        (exercise) => exercise.equipment_items && exercise.equipment_items.some((item) => filters.equipmentItems.includes(item))
      );
    }

    if (sortKey) {
      filtered.sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];
      
        // Check if values are strings, if not, convert them to strings
        valA = (typeof valA === 'string') ? valA.toLowerCase() : String(valA).toLowerCase();
        valB = (typeof valB === 'string') ? valB.toLowerCase() : String(valB).toLowerCase();
      
        let comparison = 0;
        if (valA < valB) comparison = -1;
        if (valA > valB) comparison = 1;
        return sortDirection === "ascending" ? comparison : comparison * -1;
      });
    }

    setCurrentPage(0);
    return filtered;
  }, [exercises, searchTerm, sortKey, sortDirection, filters]);

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) => (prevDirection === "ascending" ? "descending" : "ascending"));
  };

  const handleFilter = (filterData) => {
    setFilters(filterData);
  };

  const paginatedExercises = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return filteredAndSortedExercises.slice(offset, offset + itemsPerPage);
  }, [filteredAndSortedExercises, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSortKey("");
    setSortDirection("ascending");
    setFilters({});
    setCurrentPage(0);
  };

  return (
    <div>
      <ExerciseNavbar
        onSearch={(term) => setSearchTerm(term)}
        onSort={(key) => setSortKey(key)}
        onToggleSortDirection={toggleSortDirection}
        sortKey={sortKey}
        sortDirection={sortDirection}
        isAdmin={isAdmin}
        onFilter={handleFilter}
      />
      {!isLoading && error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      <Container className="mt-4">
        <Row>
          {!isLoading && paginatedExercises.length === 0 ? (
            <>
              <Alert variant="info">No exercises found matching the specified criteria.</Alert>
              <Col className="d-flex justify-content-center">
                <Button onClick={resetFilters} className="w-50" variant="secondary">
                  Reset Filters
                </Button>
              </Col>
            </>
          ) : (
            paginatedExercises.map((exercise) => <ExerciseCard key={exercise.exercise_id} exercise={exercise} isAdmin={isAdmin} />)
          )}
        </Row>

        <ReactPaginate
          previousLabel="‹"
          nextLabel={"›"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredAndSortedExercises.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />

        <ExerciseModal isAdmin={isAdmin} />
      </Container>
    </div>
  );
};

export default ExerciseManagement;
