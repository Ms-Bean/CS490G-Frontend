import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, Alert, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { fetchGoals, fetchMuscleGroups, fetchEquipmentItems } from "./../../services/exerciseServices.js";
import { ExerciseContext } from "../../context/exerciseContext";

const FilterModal = ({ show, onHide, onApplyFilter }) => {
  const [filters, setFilters] = useState({
    difficultyMin: "",
    difficultyMax: "",
    muscleGroups: [],
    goals: [],
    equipmentItems: [],
  });
  const { goals, muscleGroups, equipmentItems } = useContext(ExerciseContext);
  const [error, setError] = useState("");

  const handleInputChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    handleInputChange(name, values);
  };

  const validateFilters = () => {
    if (filters.difficultyMin !== "" && filters.difficultyMax !== "" && parseInt(filters.difficultyMin) > parseInt(filters.difficultyMax)) {
      setError("Minimum difficulty should be less than maximum difficulty");
      return false;
    }
    return true;
  };

  const applyFilter = () => {
    if (validateFilters()) {
      onApplyFilter(filters);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Filter Exercises</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Difficulty (Min)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Minimum difficulty"
                value={filters.difficultyMin}
                onChange={(e) => handleInputChange("difficultyMin", e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Difficulty (Max)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Maximum difficulty"
                value={filters.difficultyMax}
                onChange={(e) => handleInputChange("difficultyMax", e.target.value)}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Goals</Form.Label>
            <Select
              isMulti
              options={goals.map((goal) => ({ value: goal.name, label: goal.name }))}
              onChange={(selectedOptions) => handleSelectChange("goals", selectedOptions)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Muscle Groups</Form.Label>
            <Select
              isMulti
              options={muscleGroups.map((group) => ({ value: group.value, label: group.label }))}
              onChange={(selectedOptions) => handleSelectChange("muscleGroups", selectedOptions)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Equipment Items</Form.Label>
            <Select
              isMulti
              options={equipmentItems.map((item) => ({ value: item.value, label: item.label }))}
              onChange={(selectedOptions) => handleSelectChange("equipmentItems", selectedOptions)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={applyFilter}>
          Apply Filters
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
