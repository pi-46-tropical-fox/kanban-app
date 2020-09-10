<template>
    <div class="p-3">
        <div class="card p-2 shadow-sm">
            <button type="button" class="close text-black ml-auto" aria-label="Close">
                <span aria-hidden="true">x</span>
            </button>
            <h6>{{task.title}}</h6>
            <p class="text-muted">User ID:{{task.UserId}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskCard',
    props: ['task']
}
</script>

<style>

</style>