<template>
  <div class="card text-center" style="width: 18rem">
    <div class="card text-center" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">{{datum.title}}</h5>
        <p class="card-text">
          {{datum.description}}
        </p>
        <b-button v-b-modal.modal-2 @click="getTaskId">Edit</b-button>
        <!-- <a href="#" class="btn btn-primary" @click.prevent='edit'>Edit</a> -->
        <a href="#" class="btn btn-primary" @click.prevent='deleted'>Delete</a>
        <selectCat @getTaskId='getTaskId'></selectCat>
      </div>
    </div>
  </div>
</template>

<script>
import selectCat from '../components/selectCat'
export default {
    name: 'CardTask',
    props:['datum','category'],
    components:{
        selectCat
    },
    methods:{
        getTaskId(){
            console.log(this.datum.id,"dari card task")
            this.$emit('getTaskId', this.datum.id)
        }
    }
};
</script>

<style></style>
