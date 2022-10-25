import axios from "axios";

 const axiosInstance = axios.create({
    baseURL: "https://api.boookito.ir/api/v2/",
    headers:{
        Accept: "application/json"
    }
}) ;

 export default axiosInstance