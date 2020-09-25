<template>
  <div>
    <Register 
      :page="page"
      :waiting="waiting"
      @showLoader="showLoader"
      @changePage="changePage"
      @showError="showError"
    >
    </Register>
    
    <Login 
      :page="page"
      :waiting="waiting"
      @showLoader="showLoader"
      @changePage="changePage"
      @showError="showError"
      @getTasks="getTasks"
    >
    </Login>
  </div>
</template>

<script>
import Login from '../components/Login';
import Register from '../components/Register';

export default {
  name: 'Authentication',
  components: {
    Login,
    Register,
  },
  props: [ 'page', 'waiting' ],
  data() {
    return {
    }
  },
  methods: {
    changePage(nextPage) {
      this.$emit('changePage', nextPage);
    },
    showError(message) {
      this.$emit('showError', message);
    },
    showLoader(status) {
      this.$emit('showLoader', status);
    },
    getTasks() {
      this.$emit('getTasks')
    },
  },
};
</script>
