import API from './API';

export const loginAPI = async (values) => {
  await API.post('/login', values);
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
