<template>
  <div class="modal">
    <div class="modal-overlay" @click.prevent="toggleModal"></div>
    <div class="modal-container" id="todo-form-wrapper">
      <!-- Close -->
      <div class="modal-close" @click.prevent="toggleModal">
        <svg
          class="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
          />
        </svg>
        <span class="text-sm">(Esc)</span>
      </div>

      <!-- Body -->
      <div class="modal-content">
        <form id="todo-form" onsubmit="postTodo(event)">
          <!-- Title -->
          <div class="modal-title">
            <span class="title">Create new Todo</span>
          </div>

          <!-- Hidden Content(s) -->
          <input type="hidden" name="todoId" class="todoId" value />

          <!-- Content -->
          <div class="form-group">
            <label for="code">Title</label>
            <input type="text" name="title" class="title" placeholder="Todo name" />
          </div>
          <div class="form-group">
            <label for="code">Description</label>
            <textarea name="description" class="description" placeholder="Your todo description"></textarea>
          </div>
          <div class="form-group">
            <label for="code">Due date</label>
            <input type="date" name="due_date" class="due_date" placeholder="Due Date" />
          </div>
          <div class="form-group">
            <label id="code-label" for="code">The code snippet, if available</label>
            <textarea
              name="code"
              class="code"
              placeholder="If you have some code to type, please type it here."
            ></textarea>
          </div>
          <hr />

          <!-- Footer -->
          <div class="modal-footer">
            <input id="submitTodo" class="btn info" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrgModal",
  props: [],
  data() {
    return {
      //
    };
  },
  methods: {
    toggleModal(){
        this.$emit('toggleModal', 'organization')
    }
  },
};
</script>

<style>
</style>