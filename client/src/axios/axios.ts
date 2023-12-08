import axios, { type AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: window.location.origin + "/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;