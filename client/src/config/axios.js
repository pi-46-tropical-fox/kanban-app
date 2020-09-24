
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://kanbanapaaja.herokuapp.com/'
});

export default instance