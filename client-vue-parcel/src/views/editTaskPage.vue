<template>
    <div>
        <div id="editTask">
            <form @submit.prevent="editTask(idEdit)">
                <h3>Edit Your Task <span type="button" class="btn btn-danger btn-sm" id="closeAdd" data-toggle="tooltip" data-placement="bottom" title="Close" @click.prevent="close"><i class="fa fa-times" aria-hidden="true"></i></span></h3>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="titleEdit">Title</label>
                      <input type="text" class="form-control" id="titleEdit" v-model="titleEdit">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="descriptionEdit">Description</label>
                    <textarea class="form-control" id="descriptionEdit" v-model="descriptionEdit"></textarea>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-5">
                      <label for="categoryEdit">Category</label>
                      <select id="categoryEdit" v-model="categoryEdit" class="form-control">
                        <option value="" selected>--Select Category--</option>
                        <option value="backlog"><em>Backlog</em></option>
                        <option value="todo"><em>Todo</em></option>
                        <option value="doing"><em>Doing</em></option>
                        <option value="done"><em>Done</em></option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-success btn-lg btn-block"><b>Edit Task</b></button>
              </form>
        </div>
    </div>
</template>
<script>
export default {
    props: ['titleEdits', 'descriptionEdits', 'categoryEdits', 'idEdits'],
    data(){
        return{
            idEdit: this.idEdits,
            titleEdit: this.titleEdits,
            descriptionEdit: this.descriptionEdits,
            categoryEdit: this.categoryEdits
        }
    },
    methods: {
        close(){this.$emit('close')},
        editTask(id){
            let payload = {
                title: this.titleEdit,
                description: this.descriptionEdit,
                category: this.categoryEdit,
                id: this.idEdit
            }
            console.log(payload)
            this.$emit('editSubmit', payload)
          
            this.titleEdit = "";
            this.descriptionEdit = "";
            this.categoryEdit = "";
            this.idEdit = "";
        }
    },
    // data(){
    //     return{
    //         // titleEdit: titleEdit,
    //         // descriptionEdit: descriptionEdit,
    //         // categoryEdit: categoryEdit,
    //         // idEdit: idEdit
    //     }
    // }
}
</script>