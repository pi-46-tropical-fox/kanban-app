<template>
  <div style="margin-top: 2em;">
    <div
      style="display: flex;flex-direction: row;margin: 1em;justify-content: space-between;width: 12em;margin-right: 6em;"
    >
      <h6>Organization</h6>
      <a href="#" v-b-modal.modal-1>+</a>
    </div>
    <div style="display: flex;flex-direction: column;">
      <div v-for="org in orgData" :key="org.id" style="margin-left: 1em;">
        <div>
          <div
            style="display: flex;flex-direction: row;justify-content:space-between;width: 12em;"
          >
            <a
              href="#"
              style="text-decoration: none;"
              v-on:click="getBoard(org.Organization.id)"
            >
              <h6 class="card-title">{{ org.Organization.name }}</h6>
            </a>
            <p>:</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <b-modal ref="my-modal" id="modal-1" title="BootstrapVue" hide-footer>
      <form @submit.prevent="postOrganization">
        <div class="form-group">
          <label for="name">Organization Name</label>
          <input
            type="text"
            class="form-control"
            v-model="name"
            aria-describedby="emailHelp"
            id="orgName"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input
            type="text"
            class="form-control"
            v-model="description"
            id="description"
          />
        </div>
        <button type="submit" class="btn btn-primary">Create</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">
          Close
        </button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Organization",
  data() {
    return {
      name: "",
      description: "",
      orgData: [],
    };
  },
  props: ["changePage", "getBoard", "boardData"],
  methods: {
    getOrganization() {
      axios
        .get("https://ardy-kanban.herokuapp.com/organization/my", {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          this.orgData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    postOrganization() {
      axios({
        method: "post",
        url: "https://ardy-kanban.herokuapp.com/organization",
        data: {
          name: this.name,
          description: this.description,
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((res) => {
          this.getOrganization();
          this.$refs["my-modal"].hide();
          (this.name = ""), (this.description = "");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getOrganization();
  },
};
</script>

<style></style>
