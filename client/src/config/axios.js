import axios from "axios"

const instance = axios.create({baseURL : "https://kanbran-h8.herokuapp.com"})

export default instance