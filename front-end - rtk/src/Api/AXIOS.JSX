import axios from 'axios'
import { BASE_URL } from './API'
import Cookie from 'cookie-universal'

const cookie = Cookie()
const token = cookie.get('e-commerce')

export const AXIOS = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: 'Bearer ' + token }
})
