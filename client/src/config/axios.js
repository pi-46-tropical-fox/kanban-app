import axios from 'axios'

export default new axios.create({
    baseURL : 'http://localhost:3000',
    timeout : 10000,
})
