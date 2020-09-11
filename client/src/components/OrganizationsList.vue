<template>
  <div class="col-md-10 mx-auto">
    <br>
    <h2 class="pb-4"><i class="fa fa-table" aria-hidden="true">
      </i> Kanban Organization
    </h2>
    <div class="row">
      <div class="col-3">
        <div class="nav flex-column nav-pills pill-width"
        id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a class="nav-link active pill-text-size"
          id="v-pills-home-tab" data-toggle="pill"
          href="#v-pills-home" role="tab" 
          aria-controls="v-pills-home" aria-selected="true">
          <i class="fa fa-folder-o" aria-hidden="true">
          </i>
            List Organization
          </a>
          <CreateOrganization
            :host="host"
            :toaster="toaster">
          </CreateOrganization>
        </div>
      </div>
      <div class="col-9">
        <p class="tab-title text-muted">
          <b>List</b>
        </p>
        <div class="tab-content" id="v-pills-tabContent">
          <div class="tab-pane fade show active"
          id="v-pills-home" role="tabpanel" 
          aria-labelledby="v-pills-home-tab">
            <OrganizationCard
              :organization_list="organization_list"
              @deleteorganization="deleteOrganization"
              @boardrender="boardRender">
            </OrganizationCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../config/axios"
import OrganizationCard from './OrganizationCard';
import CreateOrganization from './CreateOrganization';

export default {
  name: 'OrganizationList',
  components: {
    OrganizationCard,
    CreateOrganization
  },
  props: ['host', 'toaster', 'organization_list'],
  data() {
    return {
    }
  },
  methods: {
    deleteOrganization(id) {
      axios.delete(`${this.host}/organizations/${id}`, {
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        this.$parent.deleteOrganization(id)
      })
      .catch(err => {
        console.log(err);
      })
    },
    boardRender(id) {
      this.$parent.boardRender(id)
    },
    addOrganization(data) {
      this.organization_list.push(data)
    }
  }
}
</script>

<style>

</style>