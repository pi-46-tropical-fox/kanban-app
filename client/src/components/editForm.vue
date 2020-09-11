<template>
    <div>
    <form @submit='editTask'>
      <div class="form-group">
        <input type="text" class="form-control" id="exampleInputEmail1" v-model='inputText' placeholder="Edit here..">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="buttons" class="btn btn-primary">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
name: 'editForm',
data: function() {
    return {
        inputText: ''
    }
}
,
methods:{
    editTask(){
        const payload = {
            description: this.inputText
        }
        this.$parent.editTask(payload)
        this.inputText =''
    }
}
}
</script>

<style>

</style>