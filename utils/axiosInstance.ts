import axios from "axios";

 const axiosInstance = axios.create({
    baseURL: "https://getaway.boookito.ir",
    // baseURL: "http://localhost:5000/api/v2/",
    headers:{
        Accept: "application/json"
    }
}) ;

 export default axiosInstance