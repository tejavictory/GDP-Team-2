<template>
    <div class="ui modal" id="createCourse">
        <i class="close icon"></i>
        <div class="header">
            Add a New Course
        </div>
        <div class="ui form" @submit.prevent="createCourse">
            <div class="fields">
                <div class="field">
                <label>Course Name</label>
                <input type="text" placeholder="Course Name" v-model="cname">
                </div>
                <div class="field">
                <label>Start Date</label>
                    <div class="ui calendar" id="startdate_calendar" v-on:click="startdatepick">
                        <div class="ui input left icon">
                            <i class="calendar icon"></i>
                            <input type="text" placeholder="Start Date" v-model="cstartdate">
                        </div>
                    </div>
                </div>
                <div class="field">
                <label>End Date</label>
                    <div class="ui calendar" id="enddate_calendar" v-on:click="enddatepick">
                        <div class="ui input left icon">
                            <i class="calendar icon"></i>
                            <input type="text" placeholder="End Date"  v-model="cenddate">
                        </div>
                    </div>
                </div>
            </div>
            <div class="fields">
                <div class="field">
                <label>Pre-Survey Link</label>
                <input type="text" placeholder="Pre-Survey Link" v-model="cpresurvey">
                </div>
                <div class="field">
                <label>Post-Survey Link</label>
                <input type="text" placeholder="Post-Survey Link" v-model="cpostsurvey">
                </div>      
            </div>
            <div class="fields">
                <div class="field">
                    <label> Add Students to the Course </label>
                    <div class="ui left icon input">
                        <input type="text" id="cstu" placeholder="Add Students..." v-model="cstudents">
                        <i class="users icon"></i>
                    </div>                    
                </div>      

                <div class="field">
                    <label> Upload a CSV file instead </label>
                    <input type="file" id="fileUpload" placeholder="CSV File Upload" accept=".csv" v-on:change="upload">
                </div>
            </div>
            <div class="field">
            <label>Codeword Set</label>
            <div class="ui selection dropdown">
                <input type="hidden" name="codewordsets">
                <i class="dropdown icon" v-on:click="showsets"></i>
                <div class="default text">Codeword Sets</div>
                <div class="menu">
                    <span class="item"
                        v-for="setitem in sets"
                        :key="setitem.name"
                        :set="setitem" data-value= setitem.name > {{ setitem.name }} </span>
                </div>
            </div>
            </div>
        </div>
        <div class="actions">
            <div class="ui black deny button">
            Cancel
            </div>
            <div class="ui positive right labeled icon button" v-on:click="createCourse">
            Done
            <i class="checkmark icon"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CourseModal',
    data() {
        return {
            cname: '',
            cstartdate: '',
            cenddate: '',
            cpresurvey: '',
            cpostsurvey: '',
            cassignstat: '',
            cstudents: [],
            insEmail: '',
            sets: '',
        }
    },
    methods: {
        formatStudents: function () {
        },
        startdatepick: function () {
            $('#startdate_calendar').calendar({type:'date'})
        },
        enddatepick: function () {
            $('#enddate_calendar').calendar({type:'date'})
        },
        createCourse() {
            axios.post('/coursecreate',{
                course_name: this.cname,
                startDate: this.cstartdate,
                endDate: this.cenddate,
                presurveylink: this.cpresurvey,
                postsurveylink: this.cpostsurvey,
                codewordAssignStatus: this.cassignstat,
                insEmail: this.$store.getters.useremail || localStorage.getItem('useremail'),
                users: sessionStorage.getItem('addstu').split(',')
            })
            .then(response => {
                // redirect to user home
                this.$router.go()
            })
            .catch(error => {
                // clear form inputs
                this.cname = error
            })
        },
        upload: function (evt) {
            var data = null;
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(event) {
                var csvData = event.target.result;
                data = $.csv.toArrays(csvData);
                if (data && data.length > 0) {
                    console.log(data[0])
                    this.cstudents = data[0]
                    sessionStorage.setItem('addstu',data[0])
                } else {
                    alert('No data to import!');
                }
            };
            reader.onerror = function() {
                alert('Unable to read ' + file.fileName);
            };
        },
        showsets: function () {
            axios.get('/getsets',{
            })
            .then(response => {
                this.sets = response.data.data
                // redirect to user home
                // this.$router.go()
                $('.ui.selection.dropdown').dropdown('show')
            })
            .catch(error => {
                // clear form inputs
                this.cname = error
            })
        }    
    }
}
</script>

<style scoped>
    .ui.form{
        padding: 20px;
    }
    .field{
        padding: 10px;
    }
</style>
