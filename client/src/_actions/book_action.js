import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER} from './types'
import config from '../config/key';

export function getBookList() {
    const request = axios.get('/api/books/list')
        .then(res => res.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export async function onSearchBtn(Search) {
    const query = Search;
    const api = '/v1/search/book.json';
    const url = api + "?query=" + query;

    const result = await axios.get(url , {
        headers: {
            'X-Naver-Client-Id': config.clientId,
            'X-Naver-Client-Secret' : config.clientSecret
        },
    });
 
    
    if (result.status !== 200) {
        throw new Error("API ERRPR");
    }
    
    return {
        type: LOGIN_USER,
        payload: result.data
    }
}