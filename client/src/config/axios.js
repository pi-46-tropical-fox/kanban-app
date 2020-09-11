import axios from 'axios'
import Swal from 'sweetalert2'

const instance = axios.create({
    baseURL: 'http://localhost:3000'
})

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error.response.data.errors, '>>>> ini dari axios interceptors')
    Swal.fire({
      icon: 'error',
      title: 'Wadaaw',
      text: error.response.data.errors.join(', '),
      footer: '<a href>Why do I have this issue?</a>'
    })
    return Promise.reject(error);
  });

export default instance