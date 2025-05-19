import axios from 'axios'

const token = localStorage.getItem('token') || null

// ALL Requests are handled here

const API = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        Accept: '*/*',
        "Content-Encoding": 'UTF-8',
        "Content-Type": 'applicaton/json',
        Authorization: `Bearer ${token}`
    }
});



export default API;