import axios from "axios";

 const axiosInstance = axios.create({
    baseURL: "https://api.boookito.ir/api/v2",
    // baseURL: "http://192.168.163.67:5000/api/v2/",
    headers:{
        Accept: "application/json"
    }
}) ;

 export default axiosInstance