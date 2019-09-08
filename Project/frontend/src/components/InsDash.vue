<template>
    <div class="ui container">
        <p> Instructor Dashboard Construction in progress... </p>
        <div class="ui top attached button" tabindex="0" v-on:click="showModal">Add Course</div>
        <br/>
        <div class="ui stackable four column grid">
            <InsCourse/>
            <InsCourse/>
        </div>
        <CourseModal/>
    </div>
</template>



