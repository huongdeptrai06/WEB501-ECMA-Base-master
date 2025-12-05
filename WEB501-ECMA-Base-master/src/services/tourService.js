import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '../constants/api';


export const tourService = {

  getAll: async () => {
    try {
      const { data } = await axios.get(`${API_URL}${API_ENDPOINTS.TOURS}`);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không thể tải danh sách tour',
      };
    }
  },

  getById: async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}${API_ENDPOINTS.TOUR_BY_ID(id)}`);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không tìm thấy tour',
      };
    }
  },

  create: async (tourData) => {
    try {
      const { data } = await axios.post(`${API_URL}${API_ENDPOINTS.TOURS}`, {
        ...tourData,
        price: Number(tourData.price),
        available: Number(tourData.available),
        active: Boolean(tourData.active),
      });
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không thể tạo tour mới',
      };
    }
  },


  update: async (id, tourData) => {
    try {
      const { data } = await axios.put(`${API_URL}${API_ENDPOINTS.TOUR_BY_ID(id)}`, {
        ...tourData,
        price: Number(tourData.price),
        available: Number(tourData.available),
        active: Boolean(tourData.active),
      });
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không thể cập nhật tour',
      };
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(`${API_URL}${API_ENDPOINTS.TOUR_BY_ID(id)}`);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không thể xóa tour',
      };
    }
  },

  toggleActive: async (id, currentActive) => {
    try {
      const { data } = await axios.patch(`${API_URL}${API_ENDPOINTS.TOUR_BY_ID(id)}`, {
        active: !currentActive,
      });
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Không thể thay đổi trạng thái tour',
      };
    }
  },
};



