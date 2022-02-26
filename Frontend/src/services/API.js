import axios from 'axios';

const BASE_URL = 'http://localhost:5025/api';
// const BASE_URL = 'https://sportsplatformapi.azurewebsites.net/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const API = {
  get(path, body) {
    return axiosInstance.get(path, body);
  },
  post(path, body) {
    return axiosInstance.post(path, body);
  },
  put(path, body) {
    return axiosInstance.put(path, body);
  },
  delete(path) {
    return axiosInstance.delete(path);
  },
};

export default API;
