import axios from 'axios'
import swal from 'sweetalert2'

let baseURL = 'https://kanban-x.herokuapp.com/'

if (window.location.hostname === 'localhost') {
    //preset form values here
    baseURL = 'http://localhost:3000'
}

const ax = new axios.create({
    baseURL,
    timeout : 10000,
})

ax.interceptors.response.use(res => {
    return res
}, (err) => {
    swal.fire({
        icon : 'error',
        title : 'Oops',
        text : err.response.data.errors.join(', ') || 'There was an error in trying to do that'
    })

    return Promise.reject(err)
})

export default ax
