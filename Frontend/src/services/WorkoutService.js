import API from './API';

export const postWorkoutAPI = async (programId, workout) => {
  const response = await API.post(`/programs/${programId}/workouts`, workout);
  return response;
};

export const updateWorkoutAPI = async (programId, workoutId, name, position) => {
  await API.put(`/programs/${programId}}/workouts/${workoutId}`, { name, position });
};

export const deleteWorkoutAPI = async (programId, workoutId) => {
  await API.delete(`/programs/${programId}}/workouts/${workoutId}`);
};

export const updateWorkoutPositionsAPI = async (programId, positions) => {
  await API.put(`/programs/${programId}/workoutPositions`, positions);
};

export const workoutService = {
  updateWorkoutAPI,
  postWorkoutAPI,
  deleteWorkoutAPI,
  updateWorkoutPositionsAPI,
};
