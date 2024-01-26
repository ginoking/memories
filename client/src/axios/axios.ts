import axios, { type AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.API_URL ?? (window.location.origin + "/api"),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;