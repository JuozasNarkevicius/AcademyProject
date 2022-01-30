import API from './API';

export const updateProgramAPI = async (programId, newName) => {
  await API.put(`/users/1/programs/${programId}`, { name: newName });
};

export const submitProgramAPI = async (program) => {
  await API.post('/users/1/programs', program);
};

export const postProgramAPI = async (name) => {
  const response = await API.post('/users/1/programs/name', { name });
  return response;
};

export const getProgramAPI = async (programId) => {
  const response = await API.get(`/users/1/programs/${programId}`);
  return response;
};

export const getAllProgramsAPI = async () => {
  const response = await API.get('/users/1/programs');
  return response;
};

export const deleteProgramAPI = async (programId) => {
  await API.delete(`/users/1/programs/${programId}`);
};

export const programService = {
  updateProgramAPI,
  submitProgramAPI,
  getProgramAPI,
  getAllProgramsAPI,
  postProgramAPI,
  deleteProgramAPI,
};
