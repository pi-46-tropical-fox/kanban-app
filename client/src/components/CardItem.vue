<template>
  <div :id="id">
    <a href="#" v-b-modal.modal-5 v-on:click="getTaskDetail(task.id)">
      <div
        class="shadow-sm rounded"
        style="background-color: #fff;font-size: 12px;margin-top: 1em;"
      >
        <div style="padding:5px">
          <p style="color:black;">{{ task.title }}</p>
          <p style="color:black;color:gray">{{ task.User.name }}</p>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ["task", "id"],
  methods: {
    getTaskDetail() {
      this.$emit("getTaskDetail", this.$props.task.id);
    },
  },
};
</script>

<style></style>
