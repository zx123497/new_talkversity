import axios from "./axios";

const GradeService = {
  getMissionList: async () => {
    try {
      const response = await axios.get(`/grade`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAchievementList: async (id) => {
    try {
      const response = await axios.get(`/achievement/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default GradeService;
