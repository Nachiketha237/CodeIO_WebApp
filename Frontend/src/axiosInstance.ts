import axios from "axios";

const axiosInstance = axios.create({
    withCredentials : false,
    baseURL: `http://localhost:8000`
})

export default axiosInstance