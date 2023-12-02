import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";

const EditExerciseModal = ({ selectedExercise, setSelectedExercise, handleChange, handleSubmit, goals, muscleGroups, equipmentItems }) => {
  const goalOptions = goals.map((goal) => ({ value: goal.goal_id, label: goal.name }));

  const muscleGroupOptions = muscleGroups.map((group) => {
    const muscleGroupName = Object.keys(group)[0];
    return { value: muscleGroupName, label: muscleGroupName };
  });

  const equipmentItemOptions = equipmentItems.map((item) => {
    const equipmentName = Object.keys(item)[0];
    return { value: equipmentName, label: equipmentName };
  });

  const handleSelectChange = (name, selectedOptions) => {
    console.log("handleSelectChange", name, selectedOptions);
    const updatedValues = selectedOptions.map((item) => item.value);
    setSelectedExercise((prevExercise) => ({
      ...prevExercise,
      [name]: updatedValues,
    }));
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
          name="muscleGroups"
          onChange={(selectedOptions) => handleSelectChange("muscleGroups", selectedOptions)}
          options={muscleGroupOptions}
          value={muscleGroupOptions.find((option) => option.value === selectedExercise.muscle_groups)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Equipment</Form.Label>
        <Select
          isMulti
          name="equipmentItems"
          onChange={(selectedOptions) => handleSelectChange("equipmentItems", selectedOptions)}
          options={equipmentItemOptions}
          value={equipmentItemOptions.find((option) => option.value === selectedExercise.equipment_items)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
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
