import axios from 'axios'

const token = localStorage.getItem('token') 

export const BASE_REQUEST_URL = 'http://localhost:8000/api/v1'
const API = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Authorization': `Bearer ${token}`
    }
});



export default API;