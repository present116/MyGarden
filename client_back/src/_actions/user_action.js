import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types'


export function auth() {
    const request = axios.post('/api/users/auth')
        .then(res=>res.data)
    return {
        type: AUTH_USER,
        payload : request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(res => res.data)

    return {
        type: REGISTER_USER,
        payload : request
    }
}