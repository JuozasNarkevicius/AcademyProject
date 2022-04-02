import API from './API';

export const updateProgramAPI = async (programId, newName, status) => {
  const userId = sessionStorage.getItem('id');
  await API.put(`/users/${userId}/programs/${programId}`, { name: newName, isPublic: status });
};

export const submitProgramAPI = async (program) => {
  const userId = sessionStorage.getItem('id');
  await API.post(`/users/${userId}/programs`, program);
};

export const postProgramAPI = async (name) => {
  const userId = sessionStorage.getItem('id');
  const response = await API.post(`/users/${userId}/programs/name`, { name });
  return response;
};

export const getProgramAPI = async (programId) => {
  const response = await API.get(`/programs/${programId}`);
  return response;
};

export const getAllProgramsAPI = async () => {
  const userId = sessionStorage.getItem('id');
  const response = await API.get(`/users/${userId}/programs`);
  return response;
};

export const getAllSavedProgramsAPI = async () => {
  const userId = sessionStorage.getItem('id');
  const response = await API.get(`/users/${userId}/savedPrograms`);
  return response;
};

export const getAllPublicProgramsAPI = async () => {
  const userId = sessionStorage.getItem('id');
  const response = await API.get(`/users/${userId}/programs/public`);
  return response;
};

export const deleteProgramAPI = async (programId) => {
  const userId = sessionStorage.getItem('id');
  await API.delete(`/users/${userId}/programs/${programId}`);
};

export const deleteSavedProgramAPI = async (programId) => {
  const userId = sessionStorage.getItem('id');
  await API.delete(`/users/${userId}/savedPrograms/${programId}`);
};

export const saveProgramAPI = async (programId) => {
  const userId = sessionStorage.getItem('id');
  await API.post(`/users/${userId}/savedPrograms`, { programId });
};

export const programService = {
  updateProgramAPI,
  submitProgramAPI,
  getProgramAPI,
  getAllProgramsAPI,
  getAllPublicProgramsAPI,
  postProgramAPI,
  deleteProgramAPI,
  getAllSavedProgramsAPI,
  saveProgramAPI,
  deleteSavedProgramAPI,
};
