<template>
  <div class="ui container">
    <div class="ui top attached button inverted" tabindex="1" v-on:click="showModal">
      <i class="add circle icon"></i>New Course
    </div>
    <br />
    <div class="ui stackable four column grid" id="testing">
      <InsCourse v-for="item in courses" :key="item.id" :course="item" />
    </div>
    <CourseModal />
  </div>
</template>

<script>
import InsCourse from "./InsCourse.vue";
import CourseModal from "./CourseModal.vue";
import EditCourse from "./EditCourse.vue";

export default {
  name: "InsDash",
  data() {
    return {
      courses: []
    };
  },
  components: {
    InsCourse,
    CourseModal,
    EditCourse
  },
  mounted: function() {
    this.fetchCourses();
    sessionStorage.setItem("transitioncount", 0);
    // $('.column')
    // .transition('horizontal flip in')
    // ;

    // $('.column')
    // .transition('horizontal flip')
    // ;
  },
  methods: {
    showModal: function() {
      $("#createCourse")
        .modal({
          closable: false
        })
        .modal("show");
    },
    fetchCourses() {
      // axios.get('/courses'+sessionStorage.getItem('useremail')).then(response => {
      //     this.$store.commit('changeCourses',response.data.data)
      //     this.courses = response.data.data
      // })
      axios
        .get("/course/" + sessionStorage.getItem("useremail"), {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`
          }
          // params: {
          //         email: this.$store.getters.useremail || sessionStorage.getItem('useremail')
          //     }
        })
        .then(response => {
          // this.$store.commit('changeCourses',response.data.data)
          this.courses = response.data.data;
        });
    }
  }
};
</script>

<style scoped>
.ui.top.attached.button.inverted {
  color: rgb(0, 0, 0);
  background-color: rgba(255, 255, 255, 0);
}
.ui.top.attached.button.inverted:hover {
  color: rgb(255, 242, 242);
  background-color: rgb(30, 23, 63);
}
</style>