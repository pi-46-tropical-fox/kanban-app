<template>
     <div class="card text-black bg-light mb-3">
        <div class="card-header"> {{oneTask.title}}</div>
        <div class="card-body">
        <h5 class="card-title">Dark card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['oneTask']
}
</script>