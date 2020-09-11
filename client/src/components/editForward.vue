<template>
  <div>
    <b-modal hide-footer id="modal-10" title="are you sure want to move this task?">
      <b-form @submit="editforward" inline>
    <label class="sr-only" for="inline-form-input-name">Name</label>
    <b-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Activity"
      v-model="title"
      value="this.value.title"
      hidden
    ></b-input>

    <b-button variant="primary" type="submit">Confirm</b-button>
  </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
    name:'editback',
    props:['task'],
    data(){
        return{
            title:"",
            value:[]
        }
    },
    
    methods:{
        editforward(){
            this.$emit('editforward',this.task)
        }
    } 
}
</script>

<style>

</style>