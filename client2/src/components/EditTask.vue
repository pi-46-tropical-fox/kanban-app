<template>
  <div>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Task</h5>
                
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Task Title</label>
                        <input type="text" class="form-control" >
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'AddTask',
    data() {
        return {
            title: ''
        }
    },
    method: {
        editTask() {
            axios({
                url: 'http://localhost:3000/tasks/:CategoryId',
                method: 'PUT',
                headers: {access_token: localStorage.token},
                data: {
                    title: this.title
                }     
            })

            .then(({data}) => {
                console.log(data)
                this.title = ''
            })
            .catch(err =>{
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>