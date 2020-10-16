<template>
  <div>
    <div v-if="typeof organization_list == 'string'">
      <h3 class="text-muted text-center">
        {{ organization_list }}
      </h3>
    </div>
    <div class="row" v-else>
      <div :key="organization.id" 
      v-for="organization in organization_list" 
      class="col-md-3 m-2 organization-card bg-primary">
      <div class="organization-header">
        <a href="#" @click="$emit('boardrender', organization.id)"
        class="text-white"><i class="fa fa-table text-white"
        aria-hidden="true"></i>Go To Board</a>
        <a href="#" @click.prevent="$emit('deleteorganization', organization.id)" >
          <i class="fa fa-trash text-white icon-title" aria-hidden="true">
          </i>
        </a>
      </div>
      <div class="organization-title">
        <h4 class="text-white pt-3">{{ organization.organization_name }}</h4>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrganizationCard',
  props: ['organization_list'],
}
</script>

<style scoped>
  .pill-width {
    width: 60%;
  }
  .pill-text-size {
    font-size: 14px;
  }
  .organization-card {
    cursor: pointer;
    height: 120px;
    border-radius : 5px;
    box-shadow: 1px 1px   d;
    transition: box-shadow 0.5s;
  }
  .organization-card:hover {
    box-shadow : 2px 2px #181717a6;
  }
  .organization-header{
    display: flex;
    justify-content: space-between;
    height: 20px;
  }
  .organization-header a {
    padding-top: 3px;
    font-size: 12px;
    text-decoration: none
  }
  .tab-title {
    position: relative;
    left: -15px;
  }
</style>