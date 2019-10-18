<template>
    <div class="ui container">

        <div class="ui pointing stackable container big menu">

        <div class="header item">

            Codeword App

        </div>

            <a class="item active" >

            Student Dashboard

            </a>

        <div class="right menu">

            <a class="item" @click="logout">

            Logout

            </a>

        </div>

        </div>

        <p> Student Dashboard Construction in progress... </p>

        <div class="ui stackable four column grid">

            <StuCourse
             v-for="item in courses"
                :key="item.id"
                :course="item"
            </>

        </div>

    </div>
</template>
<script>

import StuCourse from './StuCourse.vue'

 

export default {

   name: 'Student',
    data() {
        return {
            courses: [],
        }
    },
    mounted:function() {
        this.fetchUserEmail()
        this.fetchUserCourses()
        this.fetchReqStatus()
    },
    components: {
        StuCourse
    },

    methods: {

        logout () {

          name: 'Student',
    data() {
        return {
            courses: [],
        }
    },
    mounted:function() {
        this.fetchUserEmail()
        this.fetchUserCourses()
        this.fetchReqStatus()
    },
    components: {
        StuCourse
    },  localStorage.removeItem('tweetr-token')

            this.$router.push('/login')

        }

    }

}

</script>

 

<style scoped>

 

</style>
