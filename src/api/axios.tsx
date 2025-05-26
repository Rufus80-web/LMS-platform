import axios from 'axios'

// const token = localStorage.getItem('token') || null

// ALL Requests are handled here

export const BASE_REQUEST_URL = 'http://localhost:8000/api/v1'
const API = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
});



export default API;