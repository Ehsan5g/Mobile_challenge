import axios from 'axios';

const axiosClient = axios.create({
  timeout: 10000,
  baseURL: 'https://postman-library-api.glitch.me/',
  responseType: 'json',
  headers: {
    Accept: 'application/json',
  },
});

export default axiosClient;
