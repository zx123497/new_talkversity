import axios from "./axios";

const UserService = {
  UpdateUserGender: async (data) => {
    try {
      const response = await axios.patch(`/users/gender/`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  UpdateCoachGender: async (data) => {
    try {
      const response = await axios.patch(`/users/coach/gender/`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  UpdatePretest: async (data) => {
    try {
      const response = await axios.patch(`/users/pretest/`, {
        "initial": 1,
        "user_id": data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
