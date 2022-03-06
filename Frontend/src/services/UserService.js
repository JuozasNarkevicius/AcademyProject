import API from './API';

const getUserAPI = async () => {
  const id = sessionStorage.getItem('id');
  const response = await API.get(`/users/${id}`);
  return response;
};

const userService = {
  getUserAPI,
};

export default userService;
