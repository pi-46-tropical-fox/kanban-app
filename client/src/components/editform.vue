<template>
  <div>
    <b-modal hide-footer id="modal-2" title="Edit Task">
      <b-form @submit="editTask" inline>
    <label class="sr-only" for="inline-form-input-name">Name</label>
    <b-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Activity"
      v-model="title"
      value="this.value.title"

    ></b-input>

    <b-button variant="primary" type="submit">Edit</b-button>
  </b-form>
    </b-modal>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
    name:'editTask',
    props:['task'],
    data(){
        return{
            title:"",
            value:[]
        }
    },
    watch:{
        task(){
            this.title = this.task.title
        }
    }
    ,
    methods:{
        editTask(){
            console.log(this.filtered,"filtered edittask")
            this.$emit('edit',this.title)
            this.title = ""
        }
    } 
}
</script>

<style>

</style>