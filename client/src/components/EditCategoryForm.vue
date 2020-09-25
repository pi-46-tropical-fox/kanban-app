<template>
    <div class="modal-dialog text-center">
        <div class="col-sm-20 main-section">
            <div class="modal-content shadow-lg">
                <div class="col-12 form-input" style=" color:white;background-color: #797a7e;">
                    <form @submit.prevent="submitEditCategory">
                        <h1>Edit Category</h1>
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder="Title" v-model="title">
                        </div>
                        <button type="submit" class="btn mb-3" style="background-color: #89beb3; color:white;">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    name: 'EditCategoryForm',
    props:['categoryData'],
    data() {
        return {
            title: '',
        }
    },
    methods: {
        submitEditCategory() {
 	        let payload = {
                id: this.categoryData.id,
				title: this.title,
                }
			this.$emit('submitEdit', payload)
            this.title = ''    
        }
    },
    created() {
        this.title = this.categoryData.title
    }

}
</script>

<style>

</style>