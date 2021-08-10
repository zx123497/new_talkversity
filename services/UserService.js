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
};

export default UserService;
