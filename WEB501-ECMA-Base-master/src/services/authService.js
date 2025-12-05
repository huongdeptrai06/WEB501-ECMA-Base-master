import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '../constants/api';

export const authService = {
 
  login: async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}${API_ENDPOINTS.LOGIN}`, {
        email,
        password,
      });
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Đăng nhập thất bại',
      };
    }
  },

  register: async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}${API_ENDPOINTS.REGISTER}`, {
        email,
        password,
      });
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Đăng ký thất bại',
      };
    }
  },

  getToken: () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.accessToken || userData.token || null;
      } catch {
        return null;
      }
    }
    return null;
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user);
      } catch {
        return null;
      }
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('localStorageChange'));
  },
};

