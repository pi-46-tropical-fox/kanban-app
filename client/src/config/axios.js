import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://kanban-yourway.herokuapp.com'
})

export default instance