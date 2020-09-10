<template>
   <!-- MAIN PAGE -->
        <section>
            <Navbar></Navbar>
            <div class="container" id="main-page">
                <div class="row">
                    <TaskCategory></TaskCategory>
                </div>
            </div>
        </section>
</template>

<script>
import Navbar from '../components/Navbar'
import TaskCategory from '../components/TaskCategory'
export default {
name: 'MainPage',
components:{
    TaskCategory,
    Navbar
}
}
</script>

<style>

</style>