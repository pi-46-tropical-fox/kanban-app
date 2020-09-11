import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://my-kanban-apps-2.herokuapp.com'
  });

export default instance