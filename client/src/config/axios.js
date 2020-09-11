import axios from 'axios'

const host = "http://localhost"
const port = 3457

const instance = axios.create({
    baseURL: `${host}${port ? `:${port}` : ''}`
})

export default instance