<template>
<div class="ui modal" id="editCourse">

        <i class="close icon"></i>

        <div class="header">

            Edit Course

        </div>
        <div class="ui form" @submit.prevent="saveCourse">

            <div class="fields">

                <div class="field">

                <label>{{ course.course_name }}</label>

                <input type="text" v-model="cname" placeholder="Course Name">

                </div>
                <div class="field">

                <label>Start Date</label>

                    <div class="ui calendar" id="startdate_calendar" v-on:click="startdatepick">

                        <div class="ui input left icon">

                            <i class="calendar icon"></i>

                            <input type="text" placeholder="Start Date" v-model="cstartdate" value="August 1, 2019">

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

                        <input type="text" placeholder="Add Students..." v-model="cstudents">

                        <i class="users icon"></i>

                    </div>                    

                </div>      

 

                <div class="field">

                    <label> Upload a CSV file instead </label>

                    <input type="file" placeholder="File Upload">

                </div>

            </div>

        </div>
    
</template>