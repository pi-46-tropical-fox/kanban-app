<template>
    <div class="container text-center" style="margin-top:30px;">
        <h1>Ini dashboard yang dipake</h1>
        <!-- <form action="">
            <div class="form-group">
                <label for="">Search</label>
                <input type="text" class="form-control" v-model="filter">
            </div>
            {{resultFilter}}
        </form> -->
        <div class="row">
            <CardCategories
                v-for="category in categoriesData "
                :category="category" 
                :key=category.id 
                />                    
        </div>
    </div>
</template>

<script>
import CardCategories from '../components/CardCategories'
export default {
    name: 'Dashboard',
    props: ['categoriesData'],
    components: {
        CardCategories
    }

}
</script>

<style>

</style>