import axios from "axios";

export const customAxios = axios.create({
  baseURL: "http://175.120.221.117:8080",
});

export const customAxiosForFile = axios.create({
  baseURL: "http://175.120.221.117:8080",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
