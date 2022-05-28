import API from './API';

const getCurrentUserAPI = async () => {
  const id = sessionStorage.getItem('id');
  const response = await API.get(`/users/${id}`);
  return response;
};

const getUserById = async (userId) => {
  const response = await API.get(`/users/${userId}`);
  return response;
};

const changeUserRoleAPI = async (userId, newRole) => {
  await API.put(`/users/${userId}/role`, newRole);
  sessionStorage.setItem('role', newRole);
};

const userService = {
  getCurrentUserAPI,
  getUserById,
  changeUserRoleAPI,
};

export default userService;
