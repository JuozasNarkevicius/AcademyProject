import API from './API';

export const postWorkoutAPI = async (programId, workout) => {
  const response = await API.post(`/programs/${programId}/workouts`, workout);
  return response;
};

export const updateWorkoutAPI = async (programId, workoutId, name) => {
  await API.put(`/programs/${programId}}/workouts/${workoutId}`, { name });
};

export const deleteWorkoutAPI = async (programId, workoutId) => {
  await API.delete(`/programs/${programId}}/workouts/${workoutId}`);
};

export const workoutService = {
  updateWorkoutAPI,
  postWorkoutAPI,
  deleteWorkoutAPI,
};
