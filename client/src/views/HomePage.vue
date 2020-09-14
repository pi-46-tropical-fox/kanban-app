<template>
  <div>
    <div>
      <Navbar @logout="$emit('logout')" :name="name"></Navbar>
    </div>

    <div v-if="page.organization">
      <OrganizationList
        :toaster="toaster"
        :organization_list="organizations">
      </OrganizationList>
    </div>
      <div v-if="page.board">
        <Board :boardList="boardList"></Board>
      </div>
    
  </div>
</template>

<script>
import axios from "../config/axios";
import Board from '../components/Board'
import Navbar from '../components/Navbar'
import OrganizationList from '../components/OrganizationsList'

export default {
  name: 'HomePage',
  components: {
    Navbar,
    Board,
    OrganizationList
  },
  data() {
    return {
      page: {
        organization: true,
        board: false
      },
      boardList: null,
      organizations: null,
      activeBoard: null
    }
  },
  props: ['name', 'toaster'],
  mounted() {
    this.getOrganization()
    if(!localStorage.OrganizationId) {
      this.page.organization = true
    } else {
      this.boardRender(localStorage.OrganizationId)
      this.page.board = true
    }
  },
  methods: {
    getOrganization() {
      axios.get(`/organizations`, {
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        this.name = localStorage.name
        this.organizations = response.data
      })
      .catch(err => {
        console.log(err);
      })
    },
    boardRender(id) {
      axios.get(`/tasks/${id}`, {
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        // console.log('HIT');
        // console.log(response);
        this.page.organization = false
        this.page.board = true
        this.boardList = response.data[1]
        // this.boardCat = response.data[0]
        // console.log([...response.data]);
        // console.log(response.data[1]);
        localStorage.OrganizationId = id
      })
      .catch(err => {
        console.log(err);
      })
    },
    organizationList() {
      this.page.organization = true
      this.page.board = false
      localStorage.removeItem('OrganizationId')
    },
    deleteOrganization(id) {
      this.organizations = this.organizations.filter(organization => organization.id !== id)
    },
    removeElement(keys, id){
      this.activeBoard = [...this.boardList]

      for(let i  = 0; i < this.activeBoard.length; i++){
        if(keys === i){
          this.activeBoard[i].Tasks = this.activeBoard[i].Tasks.filter(task => task.id != id)
        }
      }    
      this.boardList = this.activeBoard
    }
  }

  
}
</script>

<style>

</style>