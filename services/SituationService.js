import axios from "./axios";

const ActivityService = {
  getSituationList: async () => {
    try {
      const response = await axios.get(`/scenario`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ActivityService;
