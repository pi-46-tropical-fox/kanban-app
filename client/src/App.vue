<template>
  <div>
    <Navbar 
    @logout="logout" 
    @toRegister="changePage('register')" 
    @toLogin="changePage('login')" 
    @toHome="changePage('home')"
    :isLogin = 'isLogin'
    
    ></Navbar>
    <LoginPage 
    v-if="pageName === 'login'" 
    @loginApp="login" 
    @googleChangePage="googlePage"
    ></LoginPage>
    <HomePage 
    v-if="pageName === 'home'" 
    :categories="categories" 
    :tasks="tasks" 
    @toAddTask="toAddTask" 
    @deleteTask="deleteTask" 
    @toEdit='toEdit'
    ></HomePage>
    <AddForm 
    v-if="pageName === 'addTask'" 
    @addTask="addTask" 
    :selectedCategory="selectedCategory"
    ></AddForm>
    <EditTask 
    v-if="pageName=== 'editTask'" 
    :edites='edites' 
    @update='update'
    ></EditTask>
    <Register 
    v-if="pageName === 'register'" 
    @register="register"
    ></Register>
  </div>
</template>

<script>
import axios from "./config/axios";
import LoginPage from "./components/loginPage";
import HomePage from "./components/homePage";
import AddForm from "./components/addForm";
import Navbar from './components/navbar'
import EditTask from './components/editForm'
import Register from './components/register'
export default {
  name: "App",
  data() {
    return {
      isLogin: false,
      pageName: "login",
      selectedCategory: '',
      categories: [
        {
          title: "Backlog",
          color: "bg-danger",
          category: "backlog",
        },
        {
          title: "Todo",
          color: "bg-warning",
          category: "todo",
        },
        {
          title: "Doing",
          color: "bg-success",
          category: "doing",
        },
        {
          title: "Done",
          color: "bg-info",
          category: "done",
        },
      ],
      tasks: [],
      edites: {}
    };
  },
  components: {
    LoginPage,
    HomePage,
    AddForm,
    Navbar,
    EditTask,
    Register
  },
  methods: {
    // Update task
    update(paylod) {
      const {id,title,category} = paylod

      axios
      .put(`/tasks/${id}`,{
        title,category
      }, {
        headers: {
          access_token:localStorage.access_token
        }
      })
      .then(({data}) => {
        // console.log(data);
        Swal.fire(
            'Good job!',
            `${data.message}`,
            'success'
            )
        this.changePage("home");
        this.fetchTasks()
      })
      .catch(err => {
        // console.log(err.response.data.errors.join(','));
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.errors.join(',')           
          }) 
      })
    },
    // mendapatkan task untuk edit
    toEdit(paylod) {
      // console.log(paylod);
      axios
      .get(`/tasks/${paylod}`,{
        headers: {
          access_token:localStorage.access_token
        }
      })
      .then(({data}) => {
        // console.log(data);
        this.edites = data
        this.changePage('editTask')

      })
      .catch(err => {
        // console.log(err.response.data.message);
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message             
          }) 
      })
    },
    // menampilkan form untuk add task
    toAddTask(paylod) {
      this.selectedCategory=paylod
      this.changePage('addTask')
    },
    // fungsi logout
    logout() {
      localStorage.clear()
      this.changePage('login')
      this.isLogin = false
    },
    // fungsi changpage
    changePage(page) {
      this.pageName = page;
    },
    // fungsi login
    login(paylod) {
      const { email, password } = paylod;
      axios
        .post("/login", {
          email,
          password,
        })
        .then(({ data }) => {
          // console.log(data)
          Swal.fire(
            'Good job!',
            `${data.email} telah login`,
            'success'
            )
          localStorage.setItem("access_token", data.access_token);
          this.changePage("home");
          this.fetchTasks()
          this.isLogin = true
        })
        .catch((err) => {
          // console.log(err.response.data.errors.join(','));
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.errors.join(',')              
          })   
        });
    },
    // fungsi register
    register(paylod) {
      const { email, password } = paylod;
      axios
        .post("/register", {
          email,
          password,
        })
        .then(({ data }) => {
          // console.log(data)
          Swal.fire(
            'Good job!',
            `${data.email} telah ditambahkan pada database`,
            'success'
            )          
          this.changePage("login");
        })
        .catch(err => {
          // console.log(err.response.data.errors.join(','));
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.errors.join(',')              
          })  
        });
    },
    // fungsi checkout
    checkAuth() {
      if (localStorage.access_token) {
        this.changePage("home");
        this.fetchTasks();
        this.isLogin = true
      } else {
        this.changePage("login");
      }
    },
    // google sign in
    googlePage(idToken) {
      // console.log(idToken, 'ini id token dari google');
      axios({
        url: '/googleLogin',
        method: 'post',
        headers: {
          google_access_token: idToken
        }
      })
      .then(({data}) => {
          Swal.fire(
          'Good job!',
          `${data.email} telah login`,
          'success'
          )   
          localStorage.setItem("access_token", data.access_token);
          this.changePage("home");
          this.fetchTasks()
          this.isLogin = true
        })
        .catch(err => {
          // console.log(err.response.data.errors.join(','));
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.errors.join(',')              
          })  
        })
    
    },
    // fetch data
    fetchTasks() {
      axios
        .get("/tasks", {
          headers: {
            access_token: localStorage.access_token,
          },
        })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch(err => {
          // console.log(err.response.data.errors.join(','));
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.errors.join(',')              
          })  
        });
    },
    // tambah task
    addTask(payload) {
      const { title, category } = payload;

      axios
        .post(
          "/tasks",
          {
            title,
            category,
          },
          {
            headers: {
              access_token: localStorage.access_token,
            },
          }
        )
        .then(({ data }) => {
          // console.log(data);
          Swal.fire(
            'Good job!',
            `${data.title} telah ditambahkan`,
            'success'
            )
          this.changePage('home')
          this.fetchTasks();
        })
        .catch(err => {
          // console.log(err.response.data.message);
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message              
          })  
        });
    },
    // delete task
    deleteTask(paylod) {
      // console.log(paylod);
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.isConfirmed) {
            axios
            .delete(`/tasks/${paylod}`, {
              headers: {
                    access_token: localStorage.access_token,
                  }
            })
            .then(({data}) => {
              // console.log(data);
              Swal.fire(
                  'Good job!',
                  `${data.message}`,
                  'success'
                  )
              this.changePage('home')
              this.fetchTasks();
            })
            .catch(err => {
              // console.log(err.response.data.message);
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.message              
                })  
            })
            
          }
      })
      
    }
  },
  created() {
    this.checkAuth();
  },
};
</script>

<style scoped></style>
