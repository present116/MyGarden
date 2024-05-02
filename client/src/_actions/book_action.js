import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER} from './types'


export function getBookList() {
    const request = axios.get('/api/books/list')
        .then(res => res.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}