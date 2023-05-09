import axios from "axios";

export const customAxios = axios.create({
  baseURL: "http://202.31.202.9:80",
});

export const customAxiosForFile = axios.create({
  baseURL: "http://202.31.202.9:80",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
