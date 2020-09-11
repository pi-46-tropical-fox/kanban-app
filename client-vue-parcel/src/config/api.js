import axios from "axios"

const instance = axios.create({
    baseURL: 'https://kanban-app-faudzan.herokuapp.com/',
});

module.exports = instance