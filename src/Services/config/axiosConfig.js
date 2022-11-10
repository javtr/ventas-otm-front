import axios from "axios";

export default axios.create({
  headers: {
    Authorization: localStorage.getItem("token"),
  },

  baseURL: "http://localhost:8080",
  // baseURL: "https://ventasotmv2-production.up.railway.app",

  responseType: "json",
  // timeout: 6000
});
