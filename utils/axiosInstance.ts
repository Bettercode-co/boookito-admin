import axios from "axios";
const backendInstance=['https://api.boookito.ir/api/v2/',"https://api2.boookito.ir/api/v2/"]
 let randomNumber=Math.floor(Math.random() * 10) +1
    let finalInstance=randomNumber>0 && randomNumber<6 ? 0 : 1

 const axiosInstance = axios.create({
    baseURL: backendInstance[finalInstance],
    // baseURL: "http://localhost:5000/api/v2/",
    headers:{
        Accept: "application/json"
    }
}) ;

 export default axiosInstance