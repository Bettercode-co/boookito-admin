import axios from "axios";

 const axiosInstance = axios.create({
    baseURL: "https://bookito-backend.iran.liara.run/api/v2/",
    headers:{
        Accept: "application/json"
    }
}) ;

 export default axiosInstance