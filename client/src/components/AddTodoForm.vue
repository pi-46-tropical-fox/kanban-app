<template>
    <div>
        <form action="">
            <div class="row">
                <div class="col-8">
                  <div class="form-group mb-2">
                    <input type="text" class="form-control" id="todo" placeholder="Your Todo">
                  </div>
                </div>
                <div class="col-4">
                    <button type="submit" class="btn btn-info btn-block mb-2">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AddTodoForm'
}
</script>

<style>

</style>