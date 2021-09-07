import axios from "./axios";

const RecordService = {
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
      const response = await axios.get(`/record/${id}/latest/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  postRecord: async (scenario, user) => {
    try {
      const response = await axios.post("/record/", {
        scenario: scenario,
        user: user,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  UpdateRecord: async (id,data) => {
    try {
      const response = await axios.patch(`/users/​/record​/${id}​/`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default RecordService;
