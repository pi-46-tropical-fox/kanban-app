<template>
<div class="contain" v-if="page">
  <div class="login-board" >

        <div class="form" v-if="login" >
           <h1 style="color: black;">Login</h1>
              <form @submit.prevent="sendLogin">
                <label for="fname">email </label>
                <input type="text" v-model="email" id="email" name="email" placeholder="Your email..">

                <label for="password">Password</label>
                <input type="text" v-model="password" id="password" name="pasword" placeholder="Your password..">


                <input type="submit" value="Submit">
                <div class="linkregister">
                    <p>no account? <a href="" @click.prevent="hideshow">register</a></p>
                </div>
                </form>
                <button v-google-signin-button="clientId" class="btn btn-lg btn-google btn-block text-uppercase"><i class="fab fa-google mr-2"></i> Continue with Google</button>
                <br>
                  
                 
        </div>

        <div class="form" v-if="register" >
          <h1 style="color: black;">Register</h1>
              <form @submit.prevent="sendRegister">
                <label for="fname">name </label>
                <input type="text" v-model="namereg" id="name" name="name" placeholder="Your name..">

                <label for="fname"> email </label>
                <input type="text" v-model="emailreg" id="email" name="email" placeholder="Your email..">


                <label for="password">Password</label>
                <input type="text" v-model="passreg" id="password" name="pasword" placeholder="Your password..">


                <input type="submit" value="Submit">
                <div class="linkregister">
                  <p>already have account? <a  @click.prevent="hideshow"> Login </a></p>
                </div>
                <br>
            </form>
        </div>     
  </div>
</div>
</template>
<script>
import GoogleSignInButton from 'vue-google-signin-button-directive'
import axios from 'axios'
export default {
  name : "login",
  props : ['loginstatus', 'registerstatus','local'],
  data(){
    return {
      baseUrl: `http://localhost:3001`,
      email : "",
      password: "",
      emailreg: "",
      namereg: "",
      passreg: "",
      login: true,
      register : false,
      page: true,
      clientId: "186335441114-7j536mckj8h2c6ipqs7vm3loqoqfdc4g.apps.googleusercontent.com"
    }
  },

  watch : {

      loginstatus : function(){
        this.page = !this.page
      },

      registerstatus: function(){
        this.register = !this.register
        this.login = !this.login
      }
  },

  created(){
    if(localStorage.token){
      this.page = false
    } 
    else{
      this.page = true
    }
  },

  methods : {

    hideshow(){ 
      this.login = !this.login
      this.register = !this.register
    },

    sendLogin(){
      let datalogin = {
        email : this.email,
        password : this.password
      }

      this.$emit('data-login',datalogin)
    },

    sendRegister(){
      let dataregister = {
        name : this.namereg,
        email : this.emailreg,
        password : this.passreg
      }

      this.$emit('data-register', dataregister)
    },

    OnGoogleAuthSuccess (idToken) {
      console.log(idToken)
       // Receive the idToken and make your magic with the backend
        axios({
            method:'POST',
            url: this.baseUrl+'/googleLogin',
            headers:{
                google_access_token: idToken
            }
        })
        .then(result=>{
          this.$emit('emitToLogin')
          localStorage.setItem("access_token", result.data.token)
          this.$emit('kanban', 'moveData')

          let timerInterval
          Swal.fire({
            title: 'Succes Login',
            html: 'wait..',
            timer: 1000,
            timerProgressBar: true,
            onBeforeOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                    if (b) {
                      b.textContent = Swal.getTimerLeft()
                    }
                  }
              }, 100)
            },
              onClose: () => {
                clearInterval(timerInterval)
                }
          })
          .then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              
            }
          })
        })
        .catch(err=>{
            this.message = err.response
        })
    },
    OnGoogleAuthFail (error) {
        console.log(error)
    },

        // OnGoogleAuthSuccess (idToken) {
        //     console.log(idToken)
        //     // Receive the idToken and make your magic with the backend
        //     axios({
        //         method: "POST",
        //         url: '/googleLogin',
        //         headers: {
        //             google_access_token: idToken
        //         }
        //     })
        //         .then(({data}) => {
        //             console.log(data)
        //             localStorage.setItem('access_token', data.access_token)
        //             this.$emit('emitToPage', 'Dashboard')
        //             this.$emit('emitIsLogin')
        //         })
        //         .catch(({err}) => {
        //             console.log(err)
        //             // this.$emit('emitErrorHandler', err)
        //         })

        // },
        // OnGoogleAuthFail (error) {
        //     console.log(error)
        // }

  }
}



</script>
<style scoped>
.linkregister{
  /* display: flex;
  justify-content: columns; */
  margin-left: 10px;
  text-align: center;
  color: black;
}
label {
  color: black;
  font-size: 14px
}
.contain{
  width:100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: #133357;
  background-image: url("https://media.giphy.com/media/gw3RX8HWJygFr5pC/giphy.gif");
  z-index: 5;
  padding-top: 90px;
}
.login-board{
  margin-top: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}
input[type=text], select {
  width: 100%;
  min-width: 20vw;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  min-width:20vw;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.form{
  
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 20vw;

}

.login-board .g-signin2 {
  align-items: center;
}

</style>