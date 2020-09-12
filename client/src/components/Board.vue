<template>
    <div class="board">                
        <Wraper
        :categories="categories"
        :tasks="tasks"
        v-for="category in categories"
        :key="category.id"
        :categoryName="category.name"
        :categoryId="category.id"        
        @currentAddFormId="currentAddFormId"
        @clearCurrentAddFormId="clearField"
        :currentAddFormCategoryId="addFormId"
        @successCreated="successCreated"
        @failCreated="failCreated"
        @successDeleted="successDeleted"
        @forbiddenAccess="forbiddenAccess"
        @successMoved="successMoved"
        @successEdited="successEdited"
        @failEdit="failEdit">
        </Wraper>
    </div>
</template>

<script>
import Wraper from './Wraper'
export default {
    name: 'Board',
    props: ['categories', 'tasks'],
    components: {
        Wraper
    },
    data(){
        return{
            addFormId : ''
        }
    },
    methods:{
        currentAddFormId(id){
            this.addFormId = id
        },
        clearField(){
            this.addFormId = ''
        },
        successCreated(){
            this.$emit('successCreated')
            this.clearField()
        },  
        failCreated(notif){
            this.$emit('failCreated', notif)
            this.clearField()
        }, 
        successDeleted(){
            this.$emit('successDeleted')
            this.clearField()
        },
        forbiddenAccess(notif){
            this.$emit('forbiddenAccess', notif)
        },
        successMoved(){
            this.$emit('successMoved')
            this.clearField()
        },
        successEdited(){
            this.$emit('successEdited')
            this.clearField()
        },
        failEdit(notif){
            this.$emit('failEdit', notif)
        }
    }
}
</script>

<style>

</style>