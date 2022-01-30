import API from './API';

export const postExerciseAPI = async (workoutId, exercise) => {
  const response = await API.post(`/workouts/${workoutId}/exercises`, exercise);
  return response;
};

export const updateExerciseAPI = async (workoutId, exerciseId, exercise) => {
  await API.put(`/workouts/${workoutId}/exercises/${exerciseId}`, exercise);
};

export const deleteExerciseAPI = async (workoutId, exerciseId) => {
  await API.delete(`/workouts/${workoutId}/exercises/${exerciseId}`);
};

export const exerciseService = {
  updateExerciseAPI,
  deleteExerciseAPI,
  postExerciseAPI,
};
