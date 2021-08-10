import axios from "./axios";

const SituationService = {
  getSituationList: async () => {
    try {
      const response = await axios.get(`/scenario`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default SituationService;
