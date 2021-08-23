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
};

export default ArticleService;
