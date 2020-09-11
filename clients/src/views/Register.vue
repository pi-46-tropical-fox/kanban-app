<template>
  <div>
        <div class="d-flex justify-content-center align-items-center" id="login-form">
            <div class="card mb-3" style="max-width: 840px;">
            <div class="d-flex justify-content-center">
            <div class="col-md-8">
                <img src="/assests/img/kanban1.svg" class="card-img" alt="gambar-kanban">
            </div>
            <div class="col-md-4">
                <div class="card-body d-flex align-items-center" style="height: 100%;">
                <form @submit.prevent="login" >
                    <div class="form-group">
                    <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" placeholder="Email">
                    </div>
                    <div class="form-group">
                    <input type="password" class="form-control" v-model="password" placeholder="Password">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'
export default {
    data(){
        return {
            
        }
    }
}
</script>

<style>

</style>