import axios from "axios";

const UserApi = axios.create({
    baseURL:import.meta.env.VITE_USER_URL,
    withCredentials:true
})

export default UserApi;