import React, { useState, useEffect, useMemo } from "react";
import { Container, Alert, Row } from "react-bootstrap";
import ExerciseCard from "../components/Exercises/ExerciseCard";
import ExerciseNavbar from "../components/Exercises/ExerciseNavbar";
import ExerciseModal from "../components/Exercises/ExerciseModal";

const ExerciseManagement = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalMode, setModalMode] = useState("view"); // 'view' or 'edit'
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState(""); // e.g., 'name' or 'difficulty'
  const [sortDirection, setSortDirection] = useState("ascending");

  const toggleModal = () => setShowModal(!showModal);

  const handleInfoOrEdit = (exercise, mode) => {
    setSelectedExercise(exercise);
    setModalMode(mode); // 'view' or 'edit'
    toggleModal();
  };

  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3500/exercises");
        if (!response.ok) throw new Error("Failed to fetch exercises");
        const data = await response.json();
        setExercises(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExercise.exercise_id) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3500/update_exercise/${selectedExercise.exercise_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedExercise),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update exercise");
  
      setExercises(exercises.map((ex) => {
        return ex.exercise_id === selectedExercise.exercise_id ? selectedExercise : ex;
      }));
  
      setShowModal(false);
    } catch (err) {
      // Handle error
    }
  };
  
  const handleChange = (e) => {
    setSelectedExercise({ ...selectedExercise, [e.target.name]: e.target.value });
  };

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
      />{" "}
      <Container className="mt-4">
        {isLoading ? <p>Loading exercises...</p> : error && <Alert variant="danger">{error}</Alert>}
        <Row>
          {filteredAndSortedExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.exercise_id}
              exercise={exercise}
              onEdit={() => handleInfoOrEdit(exercise, "edit")}
              onInfo={() => handleInfoOrEdit(exercise, "view")}
            />
          ))}
        </Row>

        <ExerciseModal
          showModal={showModal}
          handleClose={toggleModal}
          selectedExercise={selectedExercise}
          modalMode={modalMode}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setModalMode={setModalMode}
        />
      </Container>
    </div>
  );
};

export default ExerciseManagement;
