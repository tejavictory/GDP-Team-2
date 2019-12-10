<template>
  <div class="ui container">
    <div id="temp" class="ui pointing stackable container big menu">
      <div class="header item">Codeword App</div>
      <a class="item active">Student Dashboard</a>
      <div class="right menu">
        <a class="item" @click="logout">Logout</a>
      </div>
    </div>
    <!-- <div class="ui segment" v-if="sessionStorage.getItem('reqstat')==='Pending'">
            Instructor Previleges Pending
    </div>-->
    <div>
      <button
        class="ui button fluid inverted green"
        id="reqins"
        v-on:click="reqIns"
        style="font-family: 'Quicksand', sans-serif;"
      >Request Instructor Previleges</button>
    </div>
    <br />
    <div class="ui stackable four column grid">
      <StuCourse v-for="item in courses" :key="item.id" :course="item" />
    </div>
  </div>
</template>

<script>
import StuCourse from "./StuCourse.vue";

export default {
  name: "Student",
  data() {
    return {
      courses: []
    };
  },
  mounted: function() {
    this.fetchUserEmail();
  },
  components: {
    StuCourse
  },
  methods: {
    logout() {
      sessionStorage.removeItem("auth-token");
      this.$router.push("/login");
    },
    fetchUserEmail() {
      const token = sessionStorage.getItem("auth-token");

      axios
        .get("user/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.username = response.data.data.username;
          this.email = response.data.data.email;
          sessionStorage.setItem("username", response.data.data.username);
          this.$store.commit("changeUserEmail", response.data.data.email);
          this.fetchUserCourses();
        });
    },
    fetchUserCourses() {
      axios
        .get("/usercourses", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`
          },
          params: {
            email:
              this.$store.getters.useremail ||
              sessionStorage.getItem("useremail")
          }
        })
        .then(response => {
          // this.$store.commit('changeCourses',response.data.data)
          this.courses = response.data.data;
          this.fetchReqStatus();
        });
    },
    reqIns() {
      axios
        .post("/reqIns", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`
          },
          username:
            this.$store.getters.username || sessionStorage.getItem("username"),
          status: "Pending"
        })
        .then(response => {
          this.insstat = response.data.data;
          document.getElementById("reqins").innerHTML =
            "Pending Instructor Access";
          document.getElementById("reqins").disabled = true;
        });
    },
    fetchReqStatus() {
      try {
        axios
          .get("/getreqstat/" + sessionStorage.getItem("username"), {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`
            }
          })
          .then(response => {
            this.reqstat = response.data.data.status;
            if (response.data.data.status == "Pending") {
              document.getElementById("reqins").innerHTML =
                "Pending Instructor Access";
              document.getElementById("reqins").disabled = true;
            }
            else if(response.data.data.status == "Rejected"){
                document.getElementById('reqins').innerHTML = "Rejected Instructor Access"
                document.getElementById('reqins').disabled = true 
            }
            sessionStorage.setItem("reqstat", response.data.data.status);
          });
      } catch (error) {
        sessionStorage.setItem("reqstat", "error");
      }
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Quicksand", sans-serif;
}
.header.item {
  background-color: rgb(16, 56, 104);
  color: white;
}
#temp {
  background-color: rgb(228, 228, 228);
}
</style>