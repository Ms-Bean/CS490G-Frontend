import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { ExerciseContext } from "../../context/exerciseContext";

const EditExerciseModal = ({ handleSubmit }) => {
  const { selectedExercise, setSelectedExercise, goals, muscleGroups, equipmentItems } = useContext(ExerciseContext);
  const goalOptions = goals.map((goal) => ({ value: goal.goal_id, label: goal.name }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedExercise((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selectedOptions) => {
    console.log("Selected Options for " + name + ":", selectedOptions);

    // Map selectedOptions to an array of objects with value and label
    const updatedValues = selectedOptions ? selectedOptions.map((item) => ({ value: item.value, label: item.label })) : [];

    console.log("updatedValues", updatedValues);
    setSelectedExercise((prevExercise) => ({
      ...prevExercise,
      [name]: updatedValues,
    }));

    console.log("Updated Values for " + name + ":", selectedOptions);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Exercise Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter exercise name"
          name="name"
          value={selectedExercise.name || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter exercise description"
          name="description"
          value={selectedExercise.description || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Difficulty (0-10)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter difficulty level"
          name="difficulty"
          value={selectedExercise.difficulty || 0}
          onChange={handleChange}
          min={0}
          max={10}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Goal</Form.Label>
        <Select
          name="goal_id"
          value={goalOptions.find((option) => option.value === selectedExercise.goal_id)}
          onChange={(option) => handleChange({ target: { name: "goal_id", value: option.value } })}
          options={goalOptions}
          placeholder="Select a goal"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Muscle Groups</Form.Label>
        <Select
          isMulti
          name="muscle_groups"
          onChange={(selectedOptions) => handleSelectChange("muscle_groups", selectedOptions)}
          options={muscleGroups.map((group) => ({ value: group.value, label: group.label }))}
          value={selectedExercise.muscle_groups}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Equipment</Form.Label>
        <Select
          isMulti
          name="equipment_items"
          onChange={(selectedOptions) => handleSelectChange("equipment_items", selectedOptions)}
          options={equipmentItems.map((item) => ({ value: item.value, label: item.label }))}
          value={selectedExercise.equipment_items}
        />
      </Form.Group>

      <Form.Group className="mb-0">
        <Form.Label>Video Link</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter video link"
          name="video_link"
          value={selectedExercise.video_link || ""}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  );
};

export default EditExerciseModal;
