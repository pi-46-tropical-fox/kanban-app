<template> 
    <div class="container-fluid d-flex justify-content-between" style="width: 100vw;background-color: #EDCC8B ;">
        <div class="col-3 ">
            <div class="card-header d-flex justify-content-between">
                {{categoryName}}
            </div>
            <div>
                <CardTask v-for="task in tasksData" :key="task.id" :oneTask="task"></CardTask>
            </div>
        </div> 
    </div> 
</template>

<script>
import CardTask from './CardTask'
export default {
    name: 'CardBody',
    props: ['categoryName', 'tasksData'],
    components: {
        CardTask
    }
}
</script>