import axios from "axios";

export default axios.create({
  headers: {
    Authorization: localStorage.getItem("token"),
  },

  // baseURL: localStorage.conection == 0? "https://ventasotmv2-production.up.railway.app":"http://localhost:8080",
  // baseURL: "http://localhost:8080",
  // baseURL: "https://ventasotmv2-production.up.railway.app/",
  baseURL: "https://blue-moon-9351.fly.dev/",
  

  // https://white-forest-8775.fly.dev/
  // https://ventas2.fly.dev/

  


  responseType: "json",
  // timeout: 6000
});
