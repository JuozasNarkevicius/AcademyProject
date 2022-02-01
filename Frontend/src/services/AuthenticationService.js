import API from './API';

export const loginAPI = async (values) => {
  const response = await API.post('/login', values);
  return response;
};

export const registerAPI = async (values) => {
  await API.post('/users', values);
};

export const logoutAPI = async () => {
  await API.post('/logout');
};

export const authenticationService = {
  loginAPI,
  registerAPI,
  logoutAPI,
};
