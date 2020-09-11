import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://kanbantet.herokuapp.com'
  });

export default instance