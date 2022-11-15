import axios from "axios";

export default axios.create({
  headers: {
    Authorization: localStorage.getItem("token"),
  },

  baseURL: localStorage.conection == 0? "https://ventasotmv2-production.up.railway.app":"http://localhost:8080",
  
  responseType: "json",
  // timeout: 6000
});
