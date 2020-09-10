<template>

            <div class="col-sm" >
                <div class="shadow rounded">
                    <div class="card text-white rounded bg-danger mb-3">
                        <div class="card-header">{{category.title}}</div>
                        <div class="card-body overflow-auto" style="max-height: 400px;">
                            <CardTasks
														 	v-for="task in category.Tasks"
															:task="task" 
															:key=task.id
														/>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <button @click.prevent="deleteItem(i) ">delete</button> -->
</template>

<script>
import CardTasks from	'./CardTasks'
export default {
	name: 'CardCategories',
	props: ['category'],
	  components: {
        CardTasks
    }

}
</script>

<style>

</style>