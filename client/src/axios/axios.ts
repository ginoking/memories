import axios, { type AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:7070/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;