let users = [
    {
        id: 1,
        email: 'abdul@mail.com',
        password: '123456'
    },
    {
        id: 2,
        email: 'abdul1@mail.com',
        password: '123456'
    }
]
let categories = [
    {
        id: 1,
        name: 'Backlog'
    },
    {
        id: 2,
        name: 'To Do'
    },
    {
        id: 3,
        name: 'Doing'
    },
    {
        id: 4,
        name: 'Done'
    },
]
let tasks = [
    {
        id: 1,
        title: 'Layout kanban',
        description: 'Bikin layout kanban dengan css flex dan grid',
        CategoryId: 4,
        UserId: 1,
        createdAt: new Date()
    },
    {
        id: 2,
        title: 'Vue di client',
        description: 'Setup vue di client',
        CategoryId: 4,
        UserId: 1,
        createdAt: new Date()
    },
    {
        id: 4,
        title: 'Server',
        description: 'Setup server',
        CategoryId: 2,
        UserId: 1,
        createdAt: new Date()
    },
    {
        id: 5,
        title: 'Axio',
        description: 'Setup axio di server',
        CategoryId: 1,
        UserId: 1,
        createdAt: new Date()
    },
    {
        id: 6,
        title: 'Alert',
        description: 'Setup alert di client',
        CategoryId: 4,
        UserId: 1,
        createdAt: new Date()
    },
    {
        id: 7,
        title: 'Rocket',
        description: 'Socket io, dragable untuk tambahan nilai',
        CategoryId: 1,
        UserId: 1,
        createdAt: new Date()
    }
  ]
let app = new Vue({
    el: '#app',
    data: {
        currentPage: 'login',
        currentUser: '',
        editForm: '',
        email: '',
        password: '',
        alerthtml: '',
        taskTitle: '',
        modalTaskId: '',
        modalTaskTitle: '',
        modalTaskDescription: '',
        modalTaskUserName: '',
        modalTaskCategoryName: '',
        modalTaskCreatedAt: '',
        users,
        categories,
        tasks,
        modalEdit: 'none',
        modalDetail: 'none'
    },
    methods: {
        showRegisterForm(){
            this.currentPage = 'register'
            this.email = ''
            this.password = ''
            this.alerthtml = ''
        },
        showLoginForm(){
            this.currentPage = 'login'
            this.currentUser = ''
            this.editForm = ''
            this.email = ''
            this.password = ''
            this.alerthtml = ''
        },
        login(){
            let match = false
            for(const user of this.users){
                if(this.email === user.email && this.password === user.password){
                    this.currentUser = user.id
                    match = true
                    break
                }
            }
            if(match){
                this.email = ''
                this.password = ''
                this.alerthtml = `<p style="background-color: #2ed574b4;">You've logged in successfully!</p>`
                this.currentPage = 'main'
            }else{
                this.alerthtml = `<p style="background-color: #ff4756ce;">Email or password is incorrect</p>`
            }
        },
        register(){
            if(!this.email){
                this.alerthtml = `<p style="background-color: #ff4756ce;">Email cannot be empty</p>`
            }else if(!this.password){
                this.alerthtml = `<p style="background-color: #ff4756ce;">Password cannot be empty</p>`
            }else{
                let found = false
                for(const user of this.users){
                    if(this.email === user.email){
                        found = true
                        break                        
                    }
                }
                if(!found){
                    let obj = {
                        email: this.email,
                        password: this.password
                    }
                    this.users.push(obj)
                    this.alerthtml = `<p style="background-color: #2ed574b4;">Account created successfully!</p>`
                    this.currentPage = 'login'
                    this.email = ''
                    this.password = ''
                }else{
                    this.alerthtml = `<p style="background-color: #ff4756ce;">Email already exists</p>`
                }
            }
        },
        showEditForm(CategoryId){
            this.alerthtml = ''
            this.editForm = CategoryId
        },
        insertTask(CategoryId){
            if(this.taskTitle.trim() === ''){
                this.alerthtml = `<p style="background-color: #ff4756ce;">Cannot insert an empty task</p>`
            }else{
                let id 
                if(this.tasks.length === 0){
                    id = 1
                }else{
                    id = this.tasks.length + 1
                }
                let obj = {
                    id,
                    title: this.taskTitle,
                    description: '',
                    CategoryId,
                    UserId: +this.currentUser,
                    createdAt: new Date()
                }
                this.tasks.push(obj)
                this.taskTitle = ''
                this.editForm = ''
                this.alerthtml = `<p style="background-color: #2ed574b4;">Task inserted successfully!</p>`
            }
        },
        closeEditForm(){
            this.taskTitle = ''
            this.editForm = ''
            this.alerthtml = ''
        },
        closeModal(){
            this.modalEdit = 'none'
            this.modalDetail = 'none'
            this.modalTaskId = ''
            this.modalTaskTitle = ''
            this.modalTaskDescription = '',
            this.modalTaskUserName = '',
            this.modalTaskCategoryName = '',
            this.modalTaskCreatedAt = ''
            this.alerthtml = ''
        },
        openModalEdit(id){
            this.modalEdit = 'block'
            this.alerthtml = ''
            for(const task of this.tasks){
                if(id === task.id){
                    const {id, title, description} = task
                    this.modalTaskId = id
                    this.modalTaskTitle = title
                    this.modalTaskDescription = description
                    break
                }  
            }
        },
        openModalDetail(userTask){
            this.modalDetail = 'block'
            this.alerthtml = ''
            for(const task of this.tasks){
                if(userTask.id === task.id){
                    const {title, description, UserId, CategoryId, createdAt} = task
                    this.modalTaskTitle = title
                    this.modalTaskDescription = description
                    this.modalTaskCreatedAt = createdAt
                    for(const user of this.users){
                        if(UserId === user.id){
                            this.modalTaskUserName = user.email
                            break
                        }
                    }
                    for(const category of this.categories){
                        if(CategoryId === category.id){
                            this.modalTaskCategoryName = category.name
                            break
                        }
                    }
                    break
                }  
            }
        },
        editTask(){
            if(this.modalTaskTitle.trim() === ''){
                this.alerthtml = `<p style="background-color: #ff4756ce;">Cannot insert an empty task</p>`
            }else{
                for(const task of this.tasks){
                    if(this.modalTaskId === task.id){
                        task.title = this.modalTaskTitle
                        task.description = this.modalTaskDescription
                        break
                    } 
                }
            }
            this.modalEdit = 'none'
            this.modalTaskId = ''
            this.modalTaskTitle = ''
            this.modalTaskDescription = ''
            this.alerthtml = `<p style="background-color: #2ed574b4;">Task edited successfully!</p>`
        },
        deleteTask(id){
            for(const task of this.tasks){
                if(id === task.id){
                    this.tasks.splice(this.tasks.indexOf(task), 1);
                    break
                } 
            }
            this.alerthtml = `<p style="background-color: #2ed574b4;">Task deleted successfully!</p>`
        },
        moveCategory(TaskId, CategoryId){
            for(const task of this.tasks){
                if(TaskId === task.id){
                    task.CategoryId = CategoryId
                    break
                } 
            }
            this.alerthtml = `<p style="background-color: #2ed574b4;">Task moved successfully!</p>`
        }
    }
  })


