import API from './API';

export const addExerciseAPI = async (workoutId, newExercise) => {
  await API.post(`/workouts/${workoutId}/exercises`, newExercise);
};

export const updateExerciseAPI = async (workoutId, exerciseId, updatedExercise) => {
  await API.put(`/workouts/${workoutId}/exercises/${exerciseId}`, updatedExercise);
};

export const deleteExerciseAPI = async (workoutId, exerciseId) => {
  await API.delete(`/workouts/${workoutId}/exercises/${exerciseId}`);
};

export const exerciseService = {
  updateExerciseAPI,
  deleteExerciseAPI,
  addExerciseAPI,
};
