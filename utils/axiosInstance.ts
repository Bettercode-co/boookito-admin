import axios from "axios";

 const axiosInstance = axios.create({
    baseURL: "192.168.1.27",
    headers:{
        Accept: "application/json"
    }
}) ;

 export default axiosInstance