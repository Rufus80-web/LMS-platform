// import jwt_decode from 'jwt-decode'
import { parseJWT } from './decode-token'

import { DecodedToken } from '../static/types'

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: DecodedToken = parseJWT(token)
        const currentTime = Math.floor(Date.now() / 1000)
        return decoded.exp < currentTime
    } catch (error) {
        return true // treat invalid token as expired
    }
}