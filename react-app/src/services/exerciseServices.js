import { config } from "./../utils/config";
const BASE_URL = `${config.backendUrl}`;

const fetchFromAPI = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetching error: ", error);
    throw error;
  }
};

const fetchGoals = async () => {
  return await fetchFromAPI("goals");
};

const fetchMuscleGroups = async () => {
  const muscleGroupsData = await fetchFromAPI("muscle-groups");
  return muscleGroupsData.map((muscleGroup) => {
    const key = Object.keys(muscleGroup)[0];
    return { value: key, label: muscleGroup[key] };
  });
};

const fetchEquipmentItems = async () => {
  const equipmentData = await fetchFromAPI("equipment");
  return equipmentData.map((equipmentItem) => {
    const key = Object.keys(equipmentItem)[0];
    return { value: key, label: equipmentItem[key] };
  });
};

export { fetchGoals, fetchMuscleGroups, fetchEquipmentItems };
