<template>
  <div>
    <form @submit='addTask'>
      <div class="form-group">
        <input type="text" class="form-control" id="exampleInputEmail1" v-model='inputText' placeholder="Your task goes here..">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <button class="btn btn-primary">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
name:'addTaskForm',
data: function() {
  return {
    inputText: ''
  }
},
methods: {
  addTask(){
    const payload = {
      description: this.inputText
    }
    this.$parent.addTask(payload)
    this.inputText = ''
  }
}
}
</script>

<style>

</style>