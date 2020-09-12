<template>
  <main>
       <Header @logout="logout"></Header>
       <div class="msg" v-html="message"></div>
       <Board
       :categories="categories"
       :tasks="tasks"
       @successCreated="successCreated"
       @failCreated="failCreated"
       @successDeleted="successDeleted"
       @forbiddenAccess="forbiddenAccess"
       @successMoved="successMoved"
       @successEdited="successEdited"
       @failEdit="failEdit">
       </Board>
  </main>
</template>

<script>
import Header from '../components/Header'
import Board from '../components/Board'
export default {
    name: 'MainPage',
    props: ['categories', 'tasks', 'message'],
    components: {
        Header,
        Board
    },
    methods: {
        logout(){
            this.$emit('logout')
        },
        successCreated(){
            this.$emit('successCreated')
        },
        failCreated(notif){
            this.$emit('failCreated', notif)
        },
        successDeleted(){
            this.$emit('successDeleted')
        },
        forbiddenAccess(notif){
            this.$emit('forbiddenAccess', notif)
        },
        successMoved(){
            this.$emit('successMoved')
        },
        successEdited(){
            this.$emit('successEdited')
        },
        failEdit(notif){
            this.$emit('failEdit', notif)
        }
    }
}
</script>

<style>

</style>