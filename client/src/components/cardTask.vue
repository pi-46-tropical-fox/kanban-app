<template>
  <div class="card text-top" style="width: 15rem" id="top">
    <div class="card text-center" style="width: 18rem" id="center">
      <div class="card-body">
        <h5 class="card-title">{{ datum.title }}</h5>
        <p class="card-text">
          {{ datum.description }}
        </p>
        <b-button v-b-modal.modal-2 @click="getTaskId">Edit</b-button>
        <!-- <a href="#" class="btn btn-primary" @click.prevent='edit'>Edit</a> -->
        <a href="#" class="btn btn-primary" @click.prevent="deleted(datum.id)"
          >Delete</a
        ><br>
        <br>
        <button @click="moveBack(datum.id, datum.CategoryId)">Backward</button>
        <button @click="move(datum.id, datum.CategoryId)">Forward</button>
      </div>
    </div>
  </div>
</template>

<script>
import selectCat from "../components/selectCat";
import Axios from "../axios/axiosInstance";
export default {
  name: "CardTask",
  props: ["datum", "category"],
  components: {
    selectCat,
  },
  methods: {
    getTaskId() {
      console.log(this.datum.id, "dari card task");
      this.$emit("getTaskId", this.datum.id);
    },
    deleted(id) {
      this.$emit("deleted", id);
    },
    move(id, CategoryId) {
      const params ={
        CategoryId : CategoryId + 1
      }
      Axios({
        url:`/task/${id}`,
        method:'PATCH',
        headers: { access_token: localStorage.getItem('access_token')},
        data: params
      })
      .then(data =>{
        console.log(data)
      })
      .catch(err =>{
        console.log(err)
        })
    },
    moveBack(id, CategoryId) {
      const params ={
        CategoryId : CategoryId - 1
      }
      Axios({
        url:`/task/${id}`,
        method:'PATCH',
        headers: { access_token: localStorage.getItem('access_token')},
        data: params
      })
      .then(data =>{
        console.log(data)
      })
      .catch(err =>{
        console.log(err)
        })
    },
  },
};
</script>

<style>
#top {
  max-width: 15rem;
}
</style>
