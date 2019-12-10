<template>
    <div class="ui container">
        <div class="ui stackable four column grid">
            <StuCourse
                v-for="item in courses"
                :key="item.id"
                :course="item"
                />
        </div>
    </div>
</template>

<script>
import StuCourse from './StuCourse.vue'

export default {
    name: 'Student',
    data() {
        return {
            courses: []
        }
    },
    components: {
        StuCourse
    },
    mounted:function() {
        this.fetchUserCourses()
    },
    methods: {
        logout () {
            sessionStorage.removeItem('tweetr-token')
            this.$router.push('/login')
        },
        fetchUserCourses() {
        //    axios.get('/usercourses?email=bdfffd@gmail.com').then(response => {
        //         // this.$store.commit('changeCourses',response.data.data)
        //         this.courses = response.data.data
        //     })
            axios.get('/usercourses', {
            headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('auth-token')}`
                    },
             params: {
                        email: this.$store.getters.useremail || sessionStorage.getItem('useremail')
                    }
           }).then(response => {
                // this.$store.commit('changeCourses',response.data.data)
                this.courses = response.data.data
            })
        }
    }
}
</script>

<style scoped>

</style>