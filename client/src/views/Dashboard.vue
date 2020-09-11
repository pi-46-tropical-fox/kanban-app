<template>
    <section class="flex items-start" id="home">
        <DashSidebar @toggleModal="toggleModal"></DashSidebar>
        <DashContent @getProject="getProject" @navigate="navigate" :organizations="organizations"></DashContent>

        <OrgModal @toggleModal="toggleModal" :class="showOrgModal ? '' :  'opacity-0 pointer-events-none'"></OrgModal>
        <ProjectModal @toggleModal="toggleModal" :class="showProjectModal ? '' :  'opacity-0 pointer-events-none'"></ProjectModal>
    </section>
</template>

<script>
import axios from "../config/axios"

import DashSidebar from "../components/dashboard/DashSidebar";
import DashContent from "../components/dashboard/DashContent";
import OrgModal from "../components/dashboard/partials/OrgModal";
import ProjectModal from "../components/dashboard/partials/ProjectModal";

export default {
    props: {
        settings: Object,
        organizations: Array
    },

    data() {
        return {
            showOrgModal: false,
            showProjectModal: false,
        }
    },

    components: {
        DashSidebar,
        DashContent,

        OrgModal,
        ProjectModal
    },

    methods: {
        toggleModal(name){
            switch(name){
                case 'organization':
                    this.showOrgModal = !this.showOrgModal
                    break
                case 'project':
                    this.showProjectModal = !this.showProjectModal
                    break
                default:
                    break
            }
        },

        navigate(name){
            this.$emit('navigate', name)
        },

        getProject(id){
            this.$emit('getProject', id)
        }
    },

    computed: {
        getOrganizations(){
            this.$emit('getOrganizations')
        }
    }

}
</script>

<style>

</style>