/**
 * Axios instance for sending requests to the server.
 */

import { getCookie } from './utils';

import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    proxy: {
        protocol: import.meta.env.VITE_PROTOCOL,
        host: import.meta.env.VITE_HOST,
        port: import.meta.env.VITE_PORT,
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrftoken')  // Get token from cookie
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;  // Attach token to request header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});