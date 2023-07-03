import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: process.env.REACT_APP_BACKEND_HOST,
// });
export default axios.create({
    baseURL: 'http://127.0.0.1:5000',
});
