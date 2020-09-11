import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://kanban-izra.herokuapp.com'
  });

export default instance