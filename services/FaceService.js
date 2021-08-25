import axios from "./axios";

const FaceService = {
  getFaceLatest: async (id) => {
    try {
      const response = await axios.get(`/face/${id}/latest`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default FaceService;
