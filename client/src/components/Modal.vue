<template>
	<div class="modal fade" id="TaskModal" tabindex="-1" role="dialog" aria-labelledby="TaskModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark" id="TaskModalLabel">{{ modalTitle }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label class="col-form-label text-dark">Title</label>
              <input type="text" class="form-control "v-model="title">
            </div>
            <div class="form-group">
              <label class="col-form-label text-dark">Category</label>
              <select class="custom-select" v-model="category">
                <option>Backlog</option>
                <option>Todo</option>
                <option>Done</option>
                <option>Complete</option>
              </select>
            </div>
            <div class="form-group">
              <label class="col-form-label text-dark">Description</label>
              <textarea class="form-control" v-model="description"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" @click="onSubmitModal">{{ modalButtonName }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'Model',
	props: ['modalTitle', 'modalButtonName', 'title', 'description', 'category'],
	methods: {
		onSubmitModal() {
			console.log(this.title)
		}
	},
};
</script>
