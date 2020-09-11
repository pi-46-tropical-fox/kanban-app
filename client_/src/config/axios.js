import axios from 'axios'

const instance = axios.created({
    baseURL: 'http://localhost:3000'
})

export default instance