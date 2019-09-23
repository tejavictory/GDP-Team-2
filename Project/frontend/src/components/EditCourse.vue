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
    
</template>