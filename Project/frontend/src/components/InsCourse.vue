<template>
  <div class="four wide column">
    <div class="ui fluid card">
      <div class="content">
        <label>{{ course.course_name }}</label>
        <button class="ui icon red button" id="trash" v-on:click="delCourse">
          <i class="trash alternate outline icon"></i>
        </button>
        <button class="ui icon blue button" id="edit" v-on:click="updateCourse">
          <i class="edit outline icon"></i>
        </button>
      </div>
      <div class="content">
        <div class="ui slide masked reveal">
          <div class="visible content">
            <div class="ui tiny statistic">
              <div
                class="value"
                v-if="course.codewordset!=null"
                style="font-family: 'Quicksand', sans-serif;"
              >{{ course.codewordset }}</div>
              <div class="value" v-else style="font-family: 'Quicksand', sans-serif;">--</div>
              <div class="label" style="font-family: 'Quicksand', sans-serif;">CODEWORD SET</div>
            </div>
            <br />
            <div class="ui tiny statistic">
              <div
                class="value"
                style="font-family: 'Quicksand', sans-serif;"
              >{{ this.codewordAssignStatus }}</div>
              <div class="label" style="font-family: 'Quicksand', sans-serif;">STATUS</div>
            </div>
            <!-- <h4 style="text-decoration:underline; text-align:center;">CODEWORD SET</h4>
                            <h4 style="text-align:center;">{{ course.codewordset }}</h4>
                            <h4 style="text-decoration:underline; text-align:center;">STATUS</h4>
            <h4 style="text-align:center;">{{ this.codewordAssignStatus }}</h4>-->
          </div>
          <div class="hidden content" id="temp">
            <label>Start Date:</label>
            <span>{{ course.startDate }}</span>
            <br />
            <label>End Date:</label>
            <span>{{ course.endDate }}</span>
            <br />
            <label>Pre-Survey Link:</label>
            <span>{{ course.presurveylink }}</span>
            <br />
            <label>Post-Survey Link:</label>
            <span>{{ course.postsurveylink }}</span>
            <br />
            <label>Codeword Set:</label>
            <span>{{ course.codewordset }}</span>
            <br />
            <label>Codewords Status:</label>
            <span>{{ this.codewordAssignStatus }}</span>
            <br />
          </div>
        </div>
      </div>
      <div class="extra content" v-if="course.distributed != 1">
        <button
          class="ui blue button fluid"
          v-on:click="distribute()"
          style="font-family: 'Quicksand', sans-serif;"
        >Distribute Codewords</button>
      </div>
    </div>
  </div>
</template>

<script>
import EditCourse from "./EditCourse.vue";

export default {
  name: "InsCourse",
  components: {
    EditCourse
  },
  data() {
    return {
      students: null,
      codewords: null,
      disbtn: 0,
      codewordAssignStatus: "0/0"
    };
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  mounted() {
    if (sessionStorage.getItem("transitioncount") == 0) {
      $(".four.wide.column").transition("horizontal flip in");
      sessionStorage.setItem(
        "transitioncount",
        sessionStorage.getItem("transitioncount") + 1
      );
    }
    this.getUserCourses();
  },
  methods: {
    delCourse() {
      axios
        .post("/delcourse/" + this.course.id, {
          params: { id: this.course.id }
        })
        .then(response => {
          // redirect to user home
          // this.$router.push('/InsDash')
          this.$router.go();
        })
        .catch(error => {});
    },
    updateCourse() {
      this.$store.commit("changeCourse", this.course);
      sessionStorage.setItem("editcourse", this.course.id);
      // $('#editCourse').modal('show')
      this.$router.push("/EditCourse");
    },
    distribute() {
      axios
        .get("/getStudents/" + this.course.id, {})
        .then(response => {
          this.students = response.data.data;
          if (this.course.codewordset != null && this.students.length > 0) {
            this.getWordsAndContinue();
          } else {
            $("body").toast({
              displayTime: 5000,
              class: "error",
              message: "No Students or No Codewordset assigned for the course."
            });
            return;
          }
        })
        .catch(error => {

           $("body").toast({
              displayTime: 5000,
              class: "error",
              message: "error."
            });
        });
    },
    getWordsAndContinue() {
      axios
        .get("/getWordsSet/" + this.course.codewordset, {})
        .then(response => {
          this.codewords = response.data.data;
          if (this.codewords.length >= this.students.length) {
            console.log("good");
            var i = 0;
            var emails = new Array();
            var array = new Array();
            for (i = 0; i < this.codewords.length; i++) {
              array.push(this.codewords[i].id);
            }
            for (i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * i);
              const temp = array[i];
              array[i] = array[j];
              array[j] = temp;
            }
            for (i = 0; i < this.students.length; i++) {
              emails.push(this.students[i]);
            }
            for (i = 0; i < this.students.length; i++) {
              /*            axios.post('/updateUserCourse/'+this.course.id,{
                                email: this.students[i].email,
                                codewordid: array[i]
                            })
                            .then(response => {
                                console.log(response.data.data)
                                this.codewordAssignStatus = '0/'+this.students.length
                            })
                            .catch(error => { 
                            })  */
              axios
                .post("/updateUserCourseMultiple/" + this.course.id, {
                  emails: emails,
                  codewordids: array
                })
                .then(response => {
                  console.log(response.data.data);
                  this.codewordAssignStatus = "0/" + this.students.length;
                  axios
                    .post("/distributedwords/" + this.course.id, {})
                    .then(response => {
                      this.$router.go()
                    })
                    .catch(error => {});
                //   this.$router.go();
                })
                .catch(error => {});
            }
          } else {
            $("body").toast({
              displayTime: 5000,
              class: "error",
              message: "Codewords less than number of Students"
            });
            return;
          }
        })
        .catch(error => {});
    },
    getUserCourses() {
      axios
        .get("/getusercourses", {})
        .then(response => {
          var allusercourses = response.data.data;
          var i = 0;
          var count = 0;
          var totcount = 0;
          for (i = 0; i < allusercourses.length; i++) {
            if (allusercourses[i].course_id == this.course.id) {
              totcount++;
              if (allusercourses[i].hidden == 0) {
                count++;
              }
            }
          }
          this.codewordAssignStatus = count + "/" + totcount;
        })
        .catch(error => {});
    }
  }
};
</script>



<style scoped>
* {
  font-family: "Quicksand", sans-serif;
}
label {
  font-weight: bold;
}
.ui.icon.button {
  float: right;
}
.ui.fluid.card {
  background-color: rgb(228, 228, 228);
  color: rgb(0, 0, 0);
}
</style>