<template>
  <div>
      
    <div class="col-12">
        <div class="card mb-4 rounded bg-light">
            <div class="card-header">
                <a href="#" class="card-link"><img src="/assets/move.svg" alt="">Move</a>
            </div>
            <div class="card-body">
                <p class="card-text" id="card-text">Task : {{task.title}}</p>
                <a href="#" class="card-link"><img src="/assets/edit.svg" alt="">Edit</a>
                <a href="#" class="card-link"><img src="/assets/trash-2.svg" alt="">Delete</a>
                
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
    name: "CardTask",
    props: ['task']

}
</script>

<style>

</style>