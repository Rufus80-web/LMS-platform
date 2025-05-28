import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:8000/api/v2/auths',
    headers: {
        'Content-Type': 'application/json'
    }
});
const apiURL = 'http://localhost:8000/api/v2/auths'



export const loginRequest = (credentials: RequestInit) => fetch(`${apiURL}/login`, credentials)
export const authenticateEmailRequest = (request: RequestInit) => fetch(`${apiURL}/verify-email`, request)
export const verificationCodeRequest = (request: RequestInit) => fetch(`${apiURL}/verify/verification-code`, request)
export const resetPasswordRequest = (request: RequestInit) => fetch(`${apiURL}/update-password`, request)
