import axios from "axios";


const baseURL = process.env.REACT_APP_ENV == "local" ? process.env.REACT_APP_BASE_URL_LOCAL : process.env.REACT_APP_ENV == "development" ? process.env.REACT_APP_BASE_URL_DEVELOPMENT : process.env.REACT_APP_BASE_URL_LIVE;
const Instance = axios.create({
    baseURL: baseURL
});

export default Instance;