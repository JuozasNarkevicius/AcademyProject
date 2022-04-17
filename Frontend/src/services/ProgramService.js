import API from './API';

const updateProgramAPI = async (programId, newName, status) => {
  const userId = sessionStorage.getItem('id');
  await API.put(`/users/${userId}/programs/${programId}`, { name: newName, isPublic: status });
};

const submitProgramAPI = async (program) => {
  const userId = sessionStorage.getItem('id');
  await API.post(`/users/${userId}/programs`, program);
};

const postProgramAPI = async (name) => {
  const userId = sessionStorage.getItem('id');
  const response = await API.post(`/users/${userId}/programs/name`, { name });
  return response;
};

const getProgramAPI = async (programId) => {
  const response = await API.get(`/programs/${programId}`);
  return response;
};

const getAllProgramsAPI = async () => {
  const userId = sessionStorage.getItem('id');
  const response = await API.get(`/users/${userId}/programs`);
  return response;
};

const getAllSavedProgramsAPI = async () => {
  const userId = sessionStorage.getItem('id');
  const response = await API.get(`/users/${userId}/savedPrograms`);
  return response;
};

const getAllPublicProgramsAPI = async () => {
  const userId = sessionStorage.getItem('id');
  const response = await API.get(`/users/${userId}/publicPrograms`);
  return response;
};

const deleteProgramAPI = async (programId) => {
  const userId = sessionStorage.getItem('id');
  await API.delete(`/users/${userId}/programs/${programId}`);
};

const deleteSavedProgramAPI = async (programId) => {
  const userId = sessionStorage.getItem('id');
  await API.delete(`/users/${userId}/savedPrograms/${programId}`);
};

const saveProgramAPI = async (programId) => {
  const userId = sessionStorage.getItem('id');
  await API.post(`/users/${userId}/savedPrograms`, { programId });
};

const isProgramSavedAPI = async (programId) => {
  const userId = sessionStorage.getItem('id');
  const response = API.get(`/users/${userId}/programs/${programId}/isSaved`);
  return response;
};

const getProgramPdfAPI = async (programId, name) => {
  const response = await API.get(`/pdfcreator/${programId}`, { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.download = `${name}.pdf`;
  link.click();
};

// Todo: change to email that is not hardcoded
const sendProgramPdfToEmailAPI = async (email, programId) => {
  // await API.get(`/email/${email}/program/${programId}`);
  await API.get(`/email/${email}/program/${programId}`);
};

const programService = {
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
  getProgramPdfAPI,
  sendProgramPdfToEmailAPI,
  isProgramSavedAPI,
};

export default programService;
