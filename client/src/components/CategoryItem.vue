<template>
  <div
    class="shadow-sm p-3 mb-5 rounded"
    style="margin: 1em;background-color: #ebecf0;padding: 1em;"
  >
    <h6 style="font-weight: bold;">{{ org.title }}</h6>
    <Card
      @detailData="detailData"
      :org="org"
      :categoryData="categoryData"
      :getCategory="getCategory"
    ></Card>
  </div>
</template>

<script>
import Card from '../components/Card'

export default {
    props: ['org', 'getCategory', 'categoryData'],
    components: {
        Card
    },
    methods: {
        detailData(value) {
            this.$emit('detailData', value)
        }
    }
};
</script>

<style></style>
