import axios from "./axios";

const PostVideoService = {
  postPretestVideo: async (formData) => {
    try {
      const response = await axios.post("/pretest/",formData,{
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
        },
      });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw error;
    }
  },
  postRecord: async (scenario,user) => {
    try {
      const response = await axios.post("/record/",{
        scenario: scenario,
        user: user
    });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw error;
    }
  },

  postArticle: async (formData) => {
    try {
      const response = await axios.post("/article/",formData,{
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
        },
      });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw error;
    }
  },

  postSound: async (formData) => {
    try {
      const response = await axios.post("/sound/",formData,{
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
        },
      });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw error;
    }
  },

  postFace: async (formData) => {
    try {
      const response = await axios.post("/article/",formData,{
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
        },
      });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw error;
    }
  },
};

export default PostVideoService;
