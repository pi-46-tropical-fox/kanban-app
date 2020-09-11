<template>
  <div>
    <!-- Using modifiers
    <b-button v-b-modal.my-modal>Show Modal</b-button> -->
    <!-- Using value -->
    <b-button v-b-modal="'my-modal'">Show Modal</b-button>
    <!-- The modal -->
    <b-modal id="my-modal">Hello From My Modal!</b-modal>
    <div>
      <b-form-input v-model="addTask" placeholder="task"></b-form-input>
      <!-- <div class="mt-2">Value: {{ text }}</div> -->
      
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style></style>
