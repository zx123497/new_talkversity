import axios from "./axios";

const SoundService = {
  getSound: async (id) => {
    try {
      const response = await axios.get(`/sound/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getSoundLatest: async (id) => {
    try {
      const response = await axios.get(`/sound/${id}/latest`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default SoundService;
