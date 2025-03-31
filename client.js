/**
 * Axios instance for sending requests to the server.
 */

import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    proxy: {
        protocol: import.meta.env.VITE_PROTOCOL,
        host: import.meta.env.VITE_HOST,
        port: import.meta.env.VITE_PORT,
      }
});