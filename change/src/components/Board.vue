<template>
  <div style="margin-top: 2em;">
    <h2>{{ boardData.name }} Board</h2>
    <div>
      <div v-if="boardData.length < 1">
        Select or Create New Organizations
      </div>
      <div
        v-else
        style="display: flex;flex-wrap: wrap;justify-content: center;"
      >
        <div class="container">
          <div class="row">
            <div v-for="org in boardData.Boards" :key="org.id">
              <div
                class="card"
                style="margin: 1em;background-color: #2a9c6c;height: 8em;width: 15em;"
              >
                <a
                  href="#"
                  style="text-decoration: none;color: white;"
                  v-on:click="getCategory(org.id)"
                >
                  <div class="card-body">
                    <h5 class="card-title">{{ org.name }}</h5>
                  </div>
                </a>
              </div>
            </div>
            <div
              class="card"
              style="width: 15em;margin: 1em;background-color: gray;"
            >
              <a
                href="#"
                style="text-decoration: none;color: white;"
                v-b-modal.modal-2
              >
                <div class="card-body">
                  <h5 class="card-title">Create New Board</h5>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal ref="my-modal" id="modal-2" title="Create New Board" hide-footer>
      <form @submit.prevent="createBoard(boardData.id)">
        <div class="form-group">
          <label for="name">Board Name</label>
          <input
            type="text"
            class="form-control"
            v-model="name"
            aria-describedby="emailHelp"
            id="orgName"
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
  name: "Board",
  data() {
    return {
      name: "",
    };
  },
  props: ["boardData", "getBoard", "getCategory"],
  methods: {
    createBoard(id) {
      axios({
        method: "post",
        url: `http://localhost:3000/board/${id}`,
        data: {
          name: this.name,
        },
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((res) => {
          this.$props.getBoard(this.$props.boardData.id);
          this.$refs["my-modal"].hide();
          (this.name = ""), (this.description = "");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
