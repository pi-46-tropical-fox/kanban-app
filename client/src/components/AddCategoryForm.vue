<template>
  <div class="modal fade" id="staticBackdrop" data-backdrop=""  aria-hidden="true">
  <div class="modal-dialog">
    <form @submit.prevent="submitCategory">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Add Category</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
            <div class="form-group">
                <label for="exampleInputEmail1">Category Title</label>
                <input type="text" class="form-control" v-model="title">
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn" style="background-color: #89beb3; color:white;">Submit</button>
      </div>
    </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
    name: "AddCategoryForm",
    data() {
      return {
        title: ''
      }
    },
    methods: {
      submitCategory() {
        let payload = {
          title: this.title
        }
        this.$emit('createCategory', payload)
        this.title = ''
      }
    }

}
</script>

<style>

</style>