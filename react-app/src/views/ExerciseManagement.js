import React, { useState, useEffect, useMemo, useContext } from "react";
import { Container, Alert, Row } from "react-bootstrap";
import ExerciseCard from "../components/Exercises/ExerciseCard";
import ExerciseNavbar from "../components/Exercises/ExerciseNavbar";
import ExerciseModal from "../components/Exercises/ExerciseModal";
import { ExerciseContext } from "../context/exerciseContext";

const ExerciseManagement = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { exercises } = useContext(ExerciseContext);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("ascending");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch("http://localhost:3500/get_role", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch role");
        const data = await response.json();
        setIsAdmin(data.message === "admin");
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRole();
  }, []);

  // Filter and sort exercises
  const filteredAndSortedExercises = useMemo(() => {
    let filtered = exercises.filter((exercise) => exercise.name.toLowerCase().includes(searchTerm.toLowerCase()));

    console.log(filters.difficultyMin, filters.difficultyMax);
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
      filtered = filtered.filter(
        (exercise) => exercise.goal_name === filters.goals // Assuming goals is a single string per exercise
      );
    }

    if (filters.equipmentItems && filters.equipmentItems.length > 0) {
      filtered = filtered.filter(
        (exercise) => exercise.equipment_items && exercise.equipment_items.some((item) => filters.equipmentItems.includes(item))
      );
    }

    if (sortKey) {
      filtered.sort((a, b) => {
        let comparison = 0;
        if (a[sortKey] < b[sortKey]) comparison = -1;
        if (a[sortKey] > b[sortKey]) comparison = 1;
        return sortDirection === "ascending" ? comparison : comparison * -1;
      });
    }

    return filtered;
  }, [exercises, searchTerm, sortKey, sortDirection, filters]);

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) => (prevDirection === "ascending" ? "descending" : "ascending"));
  };

  const handleFilter = (filterData) => {
    setFilters(filterData);
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
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      <Container className="mt-4">
        <Row>
          {filteredAndSortedExercises.map((exercise) => (
            <ExerciseCard key={exercise.exercise_id} exercise={exercise} isAdmin={isAdmin} />
          ))}
        </Row>

        <ExerciseModal isAdmin={isAdmin} />
      </Container>
    </div>
  );
};

export default ExerciseManagement;
