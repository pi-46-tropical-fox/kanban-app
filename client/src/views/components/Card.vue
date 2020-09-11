<template>
  <div class="card mt-3 ml-2 mr-2 mb-3 bg-light" id="backlog-cards">

                <div :id="'accordion'+taskData.id" class="mb-2 mt-2 ml-1 mr-1 shadow-sm" >
                    <div class="card">
                        <div class="card-header" >
                            <h6 class="card-title">{{taskData.title}}</h6>
                            <p class= "card-subtitle">{{taskData.User.fullName}}<p>
                            <hr>
                            <p class="card-text text-wrap">{{taskData.description}}
                            </p>
                            <div class="mb-0">
                                <div class="col-md-12 text-center">
                                    <button class="btn btn-link" data-toggle="collapse" :data-target="'#collapse'+taskData.id"
                                        aria-expanded="true" :aria-controls="'collapse'+taskData.id">
                                        Actions
                                    </button>
                                </div>
                            </div>
                            <div :id="'collapse'+taskData.id" class="collapse bg-light" :aria-labelledby="'heading'+taskData.id"
                                :data-parent="'#accordion'+taskData.id">
                                <div class="card-body">
                                    <button
                                        class="btn btn-secondary btn-sm btn-block" @click="editTask">Edit</button>
                                    <button type="button"
                                        class="btn btn-secondary btn-sm btn-block">Delete</button>
                                    <button type="button" class="btn btn-secondary btn-sm btn-block">Move to
                                        Feature</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
</template>

<script>
export default {
    name: 'Card',
    props: ['taskData'],
    methods: {
        editTask(taskData) {
            this.$emit('editTask', taskData)
        }
    }
}
</script>

<style>

</style>