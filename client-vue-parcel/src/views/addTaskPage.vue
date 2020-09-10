<template>
    <!-- <div> -->
        <div id="addTask">
            <form @submit.prevent="addTask">
              <h3>Add Your Task <span type="button" class="btn btn-danger btn-sm" id="closeAdd" data-toggle="tooltip" data-placement="bottom" title="Close" @click.prevent="close"><i class="fa fa-times" aria-hidden="true"></i></span></h3>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <input type="text" class="form-control" id="titleTask" v-model="titleTask" placeholder="Title">
                  </div>
                </div>
                <div class="form-group">
                  <textarea class="form-control" id="description" v-model="description"  placeholder="Describe your task here..."></textarea>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-5">
                    <select id="category" v-model="category" class="form-control">
                      <option value="" selected>--Select Category--</option>
                      <option value="backlog">Backlog</option>
                      <option value="todo">Todo</option>
                      <option value="doing">Doing</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>
                <button type="submit" class="btn btn-success btn-lg btn-block"><b>Add New Task</b></button>
            </form>
        </div>
    <!-- </div> -->
</template>
<script>
export default {
    name: 'addForm',
    data(){
      return{
        titleTask: '',
        description: '',
        category: ''
      }
    },
    methods: {
      close(){this.$emit('close')},
      addTask(){
        let payload = {
          title: this.titleTask,
          description: this.description,
          category: this.category
        }

        this.$emit('addTaskSubmit',payload)


        this.titleTask = ''
        this.description = ''
        this.category = ''
      }
    },
}
</script>