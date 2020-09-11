import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://kanban-juan-ganteng.herokuapp.com'
  });

export default instance