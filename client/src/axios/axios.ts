import axios, { type AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;