import axios from "./axios";

const ArticleService = {
  getRecordList: async (id) => {
    try {
      const response = await axios.get(`/record/user/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getRecord: async (id) => {
    try {
      const response = await axios.get(`/record/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getRecordVideo: async (id) => {
    try {
      const response = await axios.get(`/face/${id}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getRecordWeekdate: async (id) => {
    try {
      const response = await axios.get(`/record/${id}/weekdate/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ArticleService;
