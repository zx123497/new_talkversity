import axios from "axios";
import { Buffer } from "buffer";
var username = "mis_admin";
var password = "ej03xu3m065;4cl4";
const token = Buffer.from(`${username}:${password}`, "utf8").toString("base64");

const instance = axios.create({
  baseURL: "https://talkversity.herokuapp.com/",
  headers: {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//You can also use interceptors in an instance
instance.interceptors.request.use(
  (request) => {
    console.log("request: ", request);
    // const accessToken = `Bearer ${localStorage.getItem("token")}`;
    // if (localStorage.getItem("token"))
    //   request.headers["Authorization"] = accessToken;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log("response: ", response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
