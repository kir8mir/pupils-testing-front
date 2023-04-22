import axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
const baseURL = 'http://localhost:3003'



export const api = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Authorization: `Bearer ${accessToken}`,
  },
});

api.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem('accessToken'); //TODO: Localstorage
  if (accessToken != null && request.headers) {
    request.headers.Authorization = `Bearer ${accessToken}`
    return request;
  }
  return request;
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);