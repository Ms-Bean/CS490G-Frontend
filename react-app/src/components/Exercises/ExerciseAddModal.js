import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { useAuth } from "../../hooks/useAuth";
import { FaPlusCircle } from "react-icons/fa";
import { fetchGoals, fetchMuscleGroups, fetchEquipmentItems } from "./../../services/exerciseServices.js";
import { ExerciseContext } from "../../context/exerciseContext.js";
import ConfirmDialog from "./ConfirmDialog.js";

const ExerciseAddModal = () => {
  const { user } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [goals, setGoals] = useState([]);
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
  const [selectedEquipmentItems, setSelectedEquipmentItems] = useState([]);
  const { fetchExercises } = useContext(ExerciseContext);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedGoals = await fetchGoals();
        const fetchedMuscleGroups = await fetchMuscleGroups();
        const fetchedEquipmentItems = await fetchEquipmentItems();
        setGoals(fetchedGoals);
        setMuscleGroups(fetchedMuscleGroups);
        setEquipmentItems(fetchedEquipmentItems);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  const handleMuscleGroupChange = (selectedOptions) => {
    setSelectedMuscleGroups(selectedOptions);
  };

  const handleEquipmentChange = (selectedOptions) => {
    setSelectedEquipmentItems(selectedOptions);
  };

  const toggleModal = () => setShowModal(!showModal);

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Format the selected muscle groups and equipment items
    const muscleGroups = selectedMuscleGroups.map((group) => group.value);
    const equipmentItems = selectedEquipmentItems.map((item) => item.value);

    const newExerciseData = {
      ...Object.fromEntries(formData.entries()),
      muscleGroups,
      equipmentItems,
      user_who_created_it: user.user_id,
    };

    try {
      const response = await fetch("http://localhost:3500/add_exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExerciseData),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to add new exercise");

      const addedExercise = await response.json();
      setExercises([...exercises, addedExercise]);
      fetchExercises();
      setShowModal(false);
      setShowSuccessDialog(true);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <div onClick={toggleModal} className="d-inline" style={{ cursor: "pointer" }}>
        <FaPlusCircle className="align-self-center" size={22} style={{ color: "white" }} />
      </div>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="add-exercise-form" onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Exercise Name</Form.Label>
              <Form.Control type="text" placeholder="Enter exercise name" name="name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter exercise description" name="description" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Difficulty (0-10)</Form.Label>
              <Form.Control type="number" placeholder="Enter difficulty level" name="difficulty" min={0} max={10} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Video Link</Form.Label>
              <Form.Control type="url" placeholder="Enter video link" name="video_link" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Goal</Form.Label>
              <Select options={goals.map((goal) => ({ value: goal.goal_id, label: goal.name }))} name="goal_id" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Muscle Groups</Form.Label>
              <Select
                isMulti
                options={muscleGroups.map((group) => ({ value: group.value, label: group.label }))}
                value={selectedMuscleGroups}
                onChange={handleMuscleGroupChange}
                name="muscleGroups"
              />{" "}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Equipment</Form.Label>
              <Select
                isMulti
                options={equipmentItems.map((item) => ({ value: item.value, label: item.label }))}
                value={selectedEquipmentItems}
                onChange={handleEquipmentChange}
                name="equipmentItems"
              />{" "}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="w-100 p-2" variant="primary" type="submit" form="add-exercise-form">
            Add Exercise
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccessDialog} onHide={() => setShowSuccessDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>New exercise added successfully!</Modal.Body>
        <Modal.Footer>
          <Button className="w-100 bg-dark" variant="primary" onClick={() => setShowSuccessDialog(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExerciseAddModal;
