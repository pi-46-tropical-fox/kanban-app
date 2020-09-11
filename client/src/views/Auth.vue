<template>
  <div>
    <LoginPage v-if="currentPage === 'loginPage' "
        v-on:loginSubmit="login" 
        @openForm="openForm"
        >
    </LoginPage>

    <RegisterPage v-if="currentPage === 'registerPage' "
        v-on:registerSubmit="register"
        @openForm="openForm">
    </RegisterPage>

  </div>
</template>

<script>
import axios from '../config/axios.js'
import LoginPage from '../components/Login-1'
import RegisterPage from '../components/Register-1'
export default {
    name: 'Auth',
    data () {
        return {
            currentPage: 'registerPage'
        }
    },
    components : {
        LoginPage,
        RegisterPage
    },
    methods: {
        checkAuth () {
          if (localStorage.access_token) {
              this.currentPage = 'dashboardPage'
              this.fetchTasks ()
              
            } else {
              this.currentPage = 'loginPage'
            }
        },
        
        // login (payload) {
        //   console.log (payload)
          
        //   axios ({
        //       url: "/users/login",
        //       method: 'POST',
        //       data: payload
        //     })

        //     .then (({data}) => {
        //         this.currentPage = 'dashboardPage'
        //         localStorage.setItem('access_token', data.access_token)
        //         console.log (data)
        //     })
        //     .catch  (err => {
        //         console.log (err)
        //     })
        // },

        login (payload) {
          console.log (payload)
          
          axios ({
              url: "/users/login",
              method: 'POST',
              data: payload
            })

            .then (({data}) => {
                this.currentPage = 'dashboardPage'
                localStorage.setItem('access_token', data.access_token)
                console.log (data)
            })
            .catch  (err => {
                console.log (err)
            })
        },

        register (payload) {
          console.log (payload)
          
          axios ({
              url: "/users/register",
              method: 'POST',
              data: payload
            })

            .then (({data}) => {
                this.currentPage = 'loginPage'
                console.log (data)
            })
            .catch  (err => {
                console.log (err)
            })
        },

        openForm (payload) {
            this.currentPage = payload
        },

        fetchTasks () {
            axios ({
              url: "/tasks/",
              method: 'GET',
              headers: {
                  access_token: localStorage.access_token
                }
            })

            .then (({data}) => {
                console.log (data.tasks)
                this.tasks = data.tasks

            })
            .catch  (err => {
                console.log (err)
            })

        },

        created () {
            this.checkAuth ()
        }


    }

}
</script>

<style scoped>

</style>