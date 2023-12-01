import React, { useState, useEffect, useMemo, useContext } from "react";
import { Container, Alert, Row } from "react-bootstrap";
import ExerciseCard from "../components/Exercises/ExerciseCard";
import ExerciseNavbar from "../components/Exercises/ExerciseNavbar";
import ExerciseModal from "../components/Exercises/ExerciseModal";
import { ExerciseContext } from "../context/exerciseContext";

const ExerciseManagement = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { exercises } = useContext(ExerciseContext); // Use exercises from context
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState(""); // e.g., 'name' or 'difficulty'
  const [sortDirection, setSortDirection] = useState("ascending");

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

    if (sortKey) {
      filtered.sort((a, b) => {
        let comparison = 0;
        if (a[sortKey] < b[sortKey]) comparison = -1;
        if (a[sortKey] > b[sortKey]) comparison = 1;
        return sortDirection === "ascending" ? comparison : comparison * -1;
      });
    }

    return filtered;
  }, [exercises, searchTerm, sortKey, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) => (prevDirection === "ascending" ? "descending" : "ascending"));
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
