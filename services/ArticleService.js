import axios from "./axios";

const ArticleService = {
  getArticleList: async (id) => {
    try {
      const response = await axios.get(`/article/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getArticleListLatest: async (id) => {
    try {
      const response = await axios.get(`/article/${id}/latest`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getArticleDetail: async (id) => {
    try {
      const response = await axios.get(`/articleDetail/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ArticleService;
