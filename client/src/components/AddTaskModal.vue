<template>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <form class="modal-content" @submit.prevent="newTask">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Add to {{category.name}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <div class="form-group">
                <label>Title</label>
                <input required class="form-control" type="text" v-model="title">
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <input type="submit" class="btn btn-primary" value="Add">
      </div>
    </form>
  </div>
</template>

<script>
export default {
    name : 'AddTaskModal',
    props : ['category'],
    data() {
        return {
            title : '',
        }
    },
    methods : {
        newTask(){
            this.$emit('newTask', { title : this.title, category : this.category.id })
        }
    },
    mounted() {
        // document.body.insertBefore(this.$el, document.body.firstChild)
    }
}
</script>