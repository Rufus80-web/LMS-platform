import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:8000/api/v2/auths',
    headers: {
        'Content-Type': 'application/json'
    }
});
const apiURL = 'http://localhost:8000/api/v2/auths'



export const loginRequest = (credentials: RequestInit) => fetch(`${apiURL}/login`, credentials)