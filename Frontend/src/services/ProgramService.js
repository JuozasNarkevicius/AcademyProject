import API from './API';

export const updateProgramNameAPI = async (programId, newName) => {
  await API.put(`/users/1/programs/${programId}`, { name: newName });
};

export const submitProgramAPI = async (program) => {
  await API.post('/users/1/programs', program);
};

export const getProgramAPI = async (programId) => {
  const response = await API.get(`/users/1/programs/${programId}`);
  return response;
};

export const getAllProgramsAPI = async () => {
  const response = await API.get('/users/1/programs');
  return response;
};

export const programService = {
  updateProgramNameAPI,
  submitProgramAPI,
  getProgramAPI,
  getAllProgramsAPI,
};
