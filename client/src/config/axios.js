import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://first-kanban-app.herokuapp.com'
});

export default instance
