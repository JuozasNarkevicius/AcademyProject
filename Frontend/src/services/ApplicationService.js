import API from './API';

const postApplicationAPI = async (application) => {
  const userId = sessionStorage.getItem('id');
  const response = await API.post('/applications', { ...application, userId });
  return response;
};

const getAllApplicationsAPI = async () => {
  const response = await API.get('/applications');
  return response;
};

const getVerifiedApplicationsAPI = async () => {
  const response = await API.get('/verifiedApplications');
  return response;
};

const getApplicationAPI = async (id) => {
  const response = await API.get(`/applications/${id}`);
  return response;
};

const changeApplicationStatusAPI = async (id, newStatus) => {
  await API.put(`/applications/${id}/status`, newStatus);
};

const applicationService = {
  postApplicationAPI,
  getAllApplicationsAPI,
  getApplicationAPI,
  getVerifiedApplicationsAPI,
  changeApplicationStatusAPI,
};

export default applicationService;
