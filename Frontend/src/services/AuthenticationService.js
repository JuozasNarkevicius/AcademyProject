import API from './API';

const loginAPI = async (values) => {
  const response = await API.post('/login', values);
  return response;
};

const registerAPI = async (values) => {
  await API.post('/users', values);
};

const logoutAPI = async () => {
  sessionStorage.clear();
  await API.post('/logout');
};

const isAdmin = () => sessionStorage.getItem('role') === 'admin';

const authenticationService = {
  loginAPI,
  registerAPI,
  logoutAPI,
  isAdmin,
};

export default authenticationService;
