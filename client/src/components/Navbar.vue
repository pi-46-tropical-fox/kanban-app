<template>
  <div class="header-nav">
    
    <nav class="navbar navbar-light" style="background-color: rgb(75, 191, 107)">
      <a class="navbar-brand" href="#">
         <span class="navbar-brand mb-0 h1"> 
          <h3>
            Kanban Board
          </h3> 
      <h6>Thank you for using this Kanban <b>{{name}}</b> !</h6>
        </span> 
      </a>
        
      <div class="logout-bar" v-if="isLogin">
        
        <a href="#" @click.prevent="$emit('logout')" id="icon-logout" style="color: white" class="oi oi-account-logout"></a>
        <span id="logout-text">Logout</span>
      </div>
    </nav>
    
    

  </div>
</template>


<script>
export default {
  name: 'Navbar',
  props: ['name'],
  data () {
    return {
      isLogin: false,
      // name: localStorage.getItem('name'),
      id: localStorage.getItem('id')
    }
  },
  methods: {
    checkLogin() {
      if (localStorage.getItem('access_token')) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
   
  },
  created() {
    this.checkLogin()
  }
}
</script>


<style scoped>
h3 {
  color: white;
  font-family: 'Nunito Sans', sans-serif;
}

h6 {
  color: white;
  font-family: 'Nunito Sans', sans-serif;
  text-align: left;
  margin: 20px 0 0 0;
  
}

#icon-logout {
  text-align: right;
  color: whitesmoke;
  font-size: 20px; 
}



#logout-text {
  text-align: right;
  color: whitesmoke;
  /* font-family: 'Nunito Sans', sans-serif; */
  font-size: 15px;
  margin: 12px 0 0 0;
}


.logout-bar {
  display: flex;
  flex-direction: column;
}




</style>

