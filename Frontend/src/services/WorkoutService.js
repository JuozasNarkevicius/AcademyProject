import API from './API';

export const updateWorkoutNameAPI = async (programId, workoutId, newName) => {
  await API.put(`/programs/${programId}}/workouts/${workoutId}`, { name: newName });
};

export const workoutService = {
  updateWorkoutNameAPI,
};
