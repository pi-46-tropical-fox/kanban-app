<template>
  <div id="greeting" class="card grid gap-4" style="flex-basis: auto;">
    <!--  -->
    <div class="section">
      <div class="rounded-full h-24 w-24" :style="{ backgroundImage: picture }"></div>
    </div>

    <div class="section">
      <span class="block">Hi there,</span>
      <div class="flex justify-between align-bottom items-start">
        <span class="block text-2xl">{{ name }}</span>
      </div>
    </div>

    <div class="section">
      <a href="#" class="btn info" @click.prevent="toggleModal('organization')">+ Todo</a>
      <a href="#" class="btn info" @click.prevent="toggleModal('project')">+ Todo</a>
      Create new Organization
      <br />Create new Project
    </div>
  </div>
</template>

<script>
export default {
    name: "DashSidebar",
    props: {},
    data() {
        return {
            showOrgModal: false,
            showProjectModal: false,
            name: localStorage.name,
            picture: localStorage.picture,
        }
    },
    methods: {
        toggleModal(name){
            this.$emit('toggleModal',name)
        }
    }
};
</script>

<style scoped>
</style>