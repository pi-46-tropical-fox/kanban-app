let app = new Vue({
    el: "#app",
    data: {
        userName: localStorage.getItem('name'),
        categories: ['Backlog', 'Todo', 'Doing', 'Done'],
        curentPage: "login",
        emailLogin: "",
        passwordLogin: "",
        nameReg: "",
        emailReg: "",
        passwordReg: "",
        titleTask: "",
        description: "",
        category: "",
        tasks: [],
        descriptionEdit: "",
        titleEdit: "",
        categoryEdit: "",
        idEdit: "",
    },
    methods:{
        deleteTask(id){
            console.log(id)
            axios({
                method: 'DELETE',
                url: `http://localhost:3000/task/${id}`,
                headers:{
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(()=>{
                console.log('sukses delete id ',id)
                this.afterlogin()
            })
            .catch(({response})=>{
                console.log(response.data.message)
            })
        },
        login(){
            axios({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data:{
                    email: this.emailLogin,
                    password: this.passwordLogin
                }
            })
            .then(({data})=>{
                console.log(data)
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('name', data.name)
                this.curentPage = 'home'
            })
            .catch(err=>{
                console.log(err)
            })
            this.emailLogin = ''
            this.passwordLogin = ''
        },
        register(){
            axios({
                method: 'POST',
                url: 'http://localhost:3000/register',
                data:{
                    name: this.nameReg,
                    email: this.emailReg,
                    password: this.passwordReg
                }
            })
            .then(({data})=>{
                console.log(data)
                this.curentPage = 'login'
            })
            .catch(err=>{
                console.log(err)
            })
            this.nameReg = ''
            this.emailReg = ''
            this. passwordReg = ''
        },
        addTask(){
            console.log('masuk add function')
            axios({
                method: 'POST',
                url: 'http://localhost:3000/task',
                headers:{
                    access_token: localStorage.getItem('access_token')
                },
                data:{
                    title: this.titleTask,
                    description: this.description,
                    category: this.category
                }
            })
            .then(({data})=>{
                console.log(data)
                this.afterlogin()
                this.titleTask = ''
                this.description = ''
                this.category = ''
            })
            .catch(err=>{
                console.log(err)
            })
            
        },
        signin(){
            this.curentPage = 'login'
        },
        signup(){
            this.curentPage = 'register'
        },
        signout(){
            localStorage.clear()
            this.curentPage = 'login'
        },
        addtask(){
            this.curentPage = 'addtask'
        },
        edittask(id){
            // console.log(id)
            axios({
                method: 'GET',
                url: `http://localhost:3000/task/${id}`,
                headers:{
                    access_token: localStorage.getItem('access_token')
                },
            })
            .then(({data})=>{
                console.log(data)
                this.titleEdit = data[0].title
                this.descriptionEdit = data[0].description
                this.categoryEdit = data[0].category
                this.idEdit = data[0].id
                this.curentPage = 'edittask'
            })
            .catch(err=>{
                console.log(err)
            })
        },
        editTask(id){
            console.log('masuk edit function', id)
            axios({
                method: 'PUT',
                url: `http://localhost:3000/task/${id}`,
                headers:{
                    access_token: localStorage.getItem('access_token')
                },
                data:{
                    title: this.titleEdit,
                    description: this.descriptionEdit,
                    category: this.categoryEdit
                }
            })
            .then(({data})=>{
                console.log(data)
                this.afterlogin()
                this.titleEdit = ''
                this.descriptionEdit = ''
                this.categoryEdit = ''
                this.idEdit = ''
            })
            .catch(err=>{
                console.log(err)
            })
        },
        afterlogin(){
            axios({
                method: 'GET',
                url: 'http://localhost:3000/task',
                headers:{
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({data})=>{
                // console.log(data)
                this.tasks = []
                data.forEach(el => {
                    this.tasks.push(el)
                });
                // console.log(this.tasks)
                this.curentPage = 'home'
            })
            .catch(err=>{
                console.log(err)
            })
        },
        moveBacklog(id){
            // console.log(id)
            axios({
                method: 'GET',
                url: `http://localhost:3000/task/${id}`,
                headers:{
                    access_token: localStorage.getItem('access_token')
                },
            })
            .then(({data})=>{
                console.log(data)
                this.titleEdit = data[0].title
                this.descriptionEdit = data[0].description
                this.categoryEdit = data[0].category
                
                return axios({
                    method: 'PUT',
                    url: `http://localhost:3000/task/${id}`,
                    headers:{
                        access_token: localStorage.getItem('access_token')
                    },
                    data:{
                        title: this.titleEdit,
                        description: this.descriptionEdit,
                        category: 'backlog'
                    }
                })
            })
            .then(()=>{
                console.log('sukses pindah ke backlog')
                this.afterlogin()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        moveTodo(id){
            // console.log(id)
            axios({
                method: 'GET',
                url: `http://localhost:3000/task/${id}`,
                headers:{
                    access_token: localStorage.getItem('access_token')
                },
            })
            .then(({data})=>{
                console.log(data)
                this.titleEdit = data[0].title
                this.descriptionEdit = data[0].description
                this.categoryEdit = data[0].category
                
                return axios({
                    method: 'PUT',
                    url: `http://localhost:3000/task/${id}`,
                    headers:{
                        access_token: localStorage.getItem('access_token')
                    },
                    data:{
                        title: this.titleEdit,
                        description: this.descriptionEdit,
                        category: 'todo'
                    }
                })
            })
            .then(()=>{
                console.log('sukses pindah ke todo')
                this.afterlogin()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        moveDoing(id){
            // console.log(id)
            axios({
                method: 'GET',
                url: `http://localhost:3000/task/${id}`,
                headers:{
                    access_token: localStorage.getItem('access_token')
                },
            })
            .then(({data})=>{
                console.log(data)
                this.titleEdit = data[0].title
                this.descriptionEdit = data[0].description
                this.categoryEdit = data[0].category
                
                return axios({
                    method: 'PUT',
                    url: `http://localhost:3000/task/${id}`,
                    headers:{
                        access_token: localStorage.getItem('access_token')
                    },
                    data:{
                        title: this.titleEdit,
                        description: this.descriptionEdit,
                        category: 'doing'
                    }
                })
            })
            .then(()=>{
                console.log('sukses pindah ke doing')
                this.afterlogin()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        moveDone(id){
            // console.log(id)
            axios({
                method: 'GET',
                url: `http://localhost:3000/task/${id}`,
                headers:{
                    access_token: localStorage.getItem('access_token')
                },
            })
            .then(({data})=>{
                console.log(data)
                this.titleEdit = data[0].title
                this.descriptionEdit = data[0].description
                this.categoryEdit = data[0].category
                
                return axios({
                    method: 'PUT',
                    url: `http://localhost:3000/task/${id}`,
                    headers:{
                        access_token: localStorage.getItem('access_token')
                    },
                    data:{
                        title: this.titleEdit,
                        description: this.descriptionEdit,
                        category: 'done'
                    }
                })
            })
            .then(()=>{
                console.log('sukses pindah ke done')
                this.afterlogin()
            })
            .catch(err=>{
                console.log(err)
            })
        },
    },
    created(){
        if(localStorage.getItem('access_token')){
            this.afterlogin()
        }else{
            this.curentPage = 'login'
        }

    }
});

