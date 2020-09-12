import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://my-kanban-apps-a60a0.web.app'
  });

export default instance