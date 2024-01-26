import axios, { type AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SOME_KEY ?? (window.location.origin + "/api"),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;