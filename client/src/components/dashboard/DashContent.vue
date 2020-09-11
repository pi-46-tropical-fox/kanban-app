<template>
  <div class="px-12">
    <div v-for="organization in organizations" :key="organization.id">
      <h3 class="mb-2">{{ organization.name }}</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" v-for="project in organization.Projects" :key="project.id">
        <a href="#" @click.prevent="getProject(project.id)">
          <div class="card p-4 transition-all duration-200 hover:bg-blue-100 hover:shadow-md">
            <h3>{{ project.name }}</h3>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

import axios from '../../config/axios'

export default {
  name: "DashContent",
  props: {
    organizations: Array,
  },
  data() {
    return {
      //
    };
  },
  methods: {
    getProject(id){
      this.$emit('getProject', id)
    },
  },
};
</script>

<style>
</style>