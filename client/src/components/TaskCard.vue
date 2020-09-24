<template>
    <div class="box">
        <article class="media" style="overflow:auto">
            <div class="media-content">
               <div class="content" v-if="!formEdit">
                    <div class="has-text-centered is-size-4" style="margin: 0">{{task.title}}
                        <div style="margin: 8px 0" class="is-size-7">{{task.user.email.toUpperCase()}} {{new Date(task.updatedAt).toISOString().split('T')[0]}}</div>
                    </div>
                    <div class="has-text-right">
                        <a style="margin: 2px; color: black" class="link" v-on:click.prevent="openForm(task.id)"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                        <a style="margin: 2px; color: black" v-if="task.CategoryId>1" v-on:click.prevent="switchCategory({id: task.id, number: -1})"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
                        <a style="margin: 2px; color: black" v-if="task.CategoryId<4" v-on:click.prevent="switchCategory({id: task.id, number: 1})"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                        <a style="margin: 2px; color: black" v-on:click.prevent="deleteTask(task.id)"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                    </div>
                </div>
                <form class="content" v-if="formEdit" @submit.prevent="update(task.id)">
                    <input class="input" type="text" name="" v-model="title">
                    <button type="submit" class="button" >Update</button>
                    <button type="submit" class="button" v-on:click.prevent="closeForm">Cancel</button>
                </form>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    name: 'Task',
    data() {
        return {
            formEdit: false,
            title: ''
        }
    },
    props: ['task'],
    methods: {
        deleteTask(id) {
            this.$emit('deleteTask', id)
        },
        openForm() {
            this.title = this.getTitle
            this.formEdit = true
        },
        closeForm() {
            this.formEdit = false
        },
        update(id) {
            this.$emit('updateTask', {id, title: this.title})
            this.formEdit = false
        },
        switchCategory(data) {
            this.$emit('switchCategory', data)
        }
    },
    computed: {
        getTitle() {
            return this.task.title
        }
    }
}
</script>

<style>

</style>