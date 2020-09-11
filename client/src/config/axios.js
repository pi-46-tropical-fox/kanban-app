import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://kanban-app-bdh8.herokuapp.com',
});

export default instance;
