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
  const response = await API.get(`/applications/${id}`, { params: { isUserId: false } });
  return response;
};

const getCurrentUserApplicationAPI = async () => {
  const userId = sessionStorage.getItem('id');
  const response = await API.get(`/applications/${userId}`, { params: { isUserId: true } });
  return response;
};

const updateApplicationAPI = async (id, application) => {
  await API.put(`/applications/${id}`, application);
};

const changeApplicationStatusAPI = async (id, newStatus) => {
  await API.put(`/applications/${id}/status`, newStatus);
};

const deleteApplicationAPI = async (id) => {
  await API.delete(`/applications/${id}`);
};

const applicationService = {
  postApplicationAPI,
  getAllApplicationsAPI,
  getApplicationAPI,
  getVerifiedApplicationsAPI,
  changeApplicationStatusAPI,
  getCurrentUserApplicationAPI,
  updateApplicationAPI,
  deleteApplicationAPI,
};

export default applicationService;
