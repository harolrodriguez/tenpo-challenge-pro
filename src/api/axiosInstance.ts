import axios from 'axios';
import { env } from '@/config/env';
import { useAuthStore } from '@/features/auth/store/auth.store';

const axiosInstance = axios.create({
  baseURL: env.TMDB_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const appToken = useAuthStore.getState().token;
    if (appToken) {
      config.headers['Authorization'] = `Bearer ${appToken}`;
    }

    config.params = {
      ...config.params,
      language: 'es-ES',
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
