import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000/api"

const Axios = axios.create({
    baseURL: BASE_URL
})

export default Axios