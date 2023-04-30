import axios from "axios";

export const customAxios = axios.create({
  baseURL: "http://175.120.221.117:8080",
});
