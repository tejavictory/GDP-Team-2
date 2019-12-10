<template>
  <div>
    <br />
    <div class="ui container">
      <table class="ui single line table">
        <thead>
          <tr>
            <th style="background-color:rgb(179,179,179);color:black">Name</th>
            <th style="background-color:rgb(179,179,179);color:black">Instructor</th>
            <!-- <th style="background-color:rgb(179,179,179);color:black">Codewords Assigned</th> -->
            <th style="background-color:rgb(179,179,179);color:black"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in courses" :key="item.id" :user="item">
            <td>{{ item.course_name }}</td>
            <td>{{ item.insEmail }}</td>
            <!-- <td>{{ item.codewordAssignStatus }}</td> -->
            <td>
              <button class="ui button inverted red" v-on:click="delCourse(item)">
                <i class="trash alternate outline icon"></i>Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CodewordSets",
  data() {
    return {
      courses: []
    };
  },
  mounted: function() {
    this.fetchUsers();
  },
  methods: {
    delCourse: function(item) {
      axios
        .post("/delcourse/" + item.id, {
          params: { id: item.id }
        })
        .then(response => {
          // redirect to user home
          // this.$router.push('/InsDash')
          this.$router.go();
        })
        .catch(error => {});
    },
    fetchUsers: function() {
      axios
        .get("/courses", {
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
tr {
  background-color: rgb(228, 228, 228);
}
</style>