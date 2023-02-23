import axios from 'axios';

const api = axios.create(
    {
        //baseURL: 'http://localhost:7249'
        baseURL: 'http://192.168.0.101:5116/api'
    }
)

export default api;

