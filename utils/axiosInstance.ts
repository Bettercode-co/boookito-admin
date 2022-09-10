import axios from "axios";

 const axiosInstance = axios.create({
    baseURL: "http://192.168.1.28:5000/api/v2/",
    headers:{
        Accept: "application/json"
    }
}) ;

 export default axiosInstance