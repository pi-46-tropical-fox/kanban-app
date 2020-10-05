<template>
  <div>
    <b-form-select v-model="moveCategory" v-for="category in Categories" :key="category.id">
        <b-form-select-option value='category.id'>{{category.name}}</b-form-select-option>
    </b-form-select>
    <div class="mt-3">
      Selected: 
      <strong>{{ selected }}</strong>
    </div>
  </div>
</template>

<script>
import axios from '../axios/axiosInstance'
import cardTask from '../components/cardTask'
export default {
    name : 'moveCategory',
    props: {
      category: Array
    },
    methods:{
        // axios.get()
    }
};
</script>

<style></style>
