<template>
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Move Category
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#" v-for="(name, index) in allCategoryName" :key="index" @click.prevent="moveCategory(allCategoryId[index])">{{ name }}</a>
    </div>
</div>
</template>

<script>
import axios from '../config/axios'
export default {
    props: ["allCategoryId", "allCategoryName", "currentCategoryId", "taskId"],
    methods: {
        moveCategory(categoryId){
            axios({
                url: `/movecategory/${this.taskId}`,
                method: 'patch',
                headers: {
                    access_token: localStorage.getItem("access_token")
                },
                data: {
                    newCategoryId: categoryId,
                    currentCategoryId: this.currentCategoryId
                }
            })
            .then(() => {
                this.$emit("fetchTasks")
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>