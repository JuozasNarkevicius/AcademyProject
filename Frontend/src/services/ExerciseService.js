import API from './API';

export const updateExerciseAPI = async (workoutId, exerciseId, newExercise) => {
  await API.put(`/workouts/${workoutId}/exercises/${exerciseId}`, newExercise);
};

export const deleteExerciseAPI = async (workoutId, exerciseId) => {
  await API.delete(`/workouts/${workoutId}/exercises/${exerciseId}`);
};

export const exerciseService = {
  updateExerciseAPI,
  deleteExerciseAPI,
};
