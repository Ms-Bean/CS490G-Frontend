import React from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

const EditExerciseModal = ({ selectedExercise, handleChange, handleSubmit, goals, muscleGroups, equipmentItems }) => {
    const goalOptions = goals.map((goal) => ({ value: goal.goal_id, label: goal.name }));
  
    const formatSelectedOptions = (selectedOptions, allOptions) => {
      return selectedOptions?.map(
        (selectedOption) => allOptions.find((option) => option.value === selectedOption) || { label: selectedOption, value: selectedOption }
      );
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
            options={muscleGroups}
            isMulti
            name="muscleGroups"
            onChange={(selectedOptions) => handleChange({ target: { name: "muscleGroups", value: selectedOptions } })}
            value={formatSelectedOptions(selectedExercise.muscleGroups || [], muscleGroups)}
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Equipment</Form.Label>
          <Select
            options={equipmentItems}
            isMulti
            name="equipmentItems"
            onChange={(selectedOptions) => handleChange({ target: { name: "equipmentItems", value: selectedOptions } })}
            value={formatSelectedOptions(selectedExercise.equipmentItems || [], equipmentItems)}
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
